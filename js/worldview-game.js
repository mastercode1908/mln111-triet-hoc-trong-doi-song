// Worldview Builder Game - Main Logic
// Handles drag & drop, connections, and game state

class WorldviewGame {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.connectionsSvg = document.getElementById("connections-svg");
    this.placedPieces = [];
    this.connections = [];
    this.selectedPiece = null;
    this.draggedElement = null;
    this.pieceIdCounter = 0;

    this.init();
  }

  init() {
    this.setupDragAndDrop();
    this.setupCanvasDropZone();
    this.setupButtons();
    this.updateStats();
    this.checkInstructions();
  }

  setupDragAndDrop() {
    const puzzlePieces = document.querySelectorAll(".puzzle-piece");

    puzzlePieces.forEach((piece) => {
      piece.addEventListener("dragstart", (e) => {
        this.handleDragStart(e);
      });

      piece.addEventListener("dragend", (e) => {
        this.handleDragEnd(e);
      });
    });
  }

  handleDragStart(e) {
    const piece = e.target.closest(".puzzle-piece");
    if (!piece) return;

    piece.classList.add("dragging");

    // Store data about the piece being dragged
    const category = piece.dataset.category;
    const id = piece.dataset.id;
    const html = piece.innerHTML;
    const classList = piece.className;

    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("text/html", html);
    e.dataTransfer.setData("category", category);
    e.dataTransfer.setData("id", id);
    e.dataTransfer.setData("classList", classList);
  }

  handleDragEnd(e) {
    const piece = e.target.closest(".puzzle-piece");
    if (piece) {
      piece.classList.remove("dragging");
    }
  }

  setupCanvasDropZone() {
    this.canvas.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    });

    this.canvas.addEventListener("drop", (e) => {
      e.preventDefault();
      this.handleDrop(e);
    });
  }

  handleDrop(e) {
    const html = e.dataTransfer.getData("text/html");
    const category = e.dataTransfer.getData("category");
    const id = e.dataTransfer.getData("id");
    const classList = e.dataTransfer.getData("classList");

    if (!html || !category || !id) return;

    // Get drop position relative to canvas
    const canvasRect = this.canvas.getBoundingClientRect();
    const x = e.clientX - canvasRect.left - 100; // Center the piece (approx width/2)
    const y = e.clientY - canvasRect.top - 50; // Center the piece (approx height/2)

    // Snap to grid (40px grid)
    const snappedX = Math.round(x / 40) * 40;
    const snappedY = Math.round(y / 40) * 40;

    // Create placed piece
    this.createPlacedPiece(html, category, id, classList, snappedX, snappedY);
  }

  createPlacedPiece(html, category, id, classList, x, y) {
    const pieceId = `placed-${this.pieceIdCounter++}`;

    const placedPiece = document.createElement("div");
    placedPiece.className =
      classList.replace("puzzle-piece", "placed-piece") + " puzzle-piece";
    placedPiece.innerHTML = html;
    placedPiece.style.left = `${x}px`;
    placedPiece.style.top = `${y}px`;
    placedPiece.style.width = "200px";
    placedPiece.style.zIndex = "10";
    placedPiece.dataset.pieceId = pieceId;
    placedPiece.dataset.category = category;
    placedPiece.dataset.id = id;

    // Make it draggable within canvas
    placedPiece.draggable = true;
    placedPiece.addEventListener("dragstart", (e) => {
      this.handlePlacedPieceDragStart(e, placedPiece);
    });

    placedPiece.addEventListener("dragend", (e) => {
      this.handlePlacedPieceDragEnd(e);
    });

    // Click to select for connection
    placedPiece.addEventListener("click", (e) => {
      e.stopPropagation();
      this.handlePieceClick(placedPiece);
    });

    this.canvas.appendChild(placedPiece);

    // Store in state
    this.placedPieces.push({
      id: pieceId,
      element: placedPiece,
      category: category,
      conceptId: id,
      x: x,
      y: y,
    });

    this.updateStats();
    this.checkInstructions();
  }

  handlePlacedPieceDragStart(e, piece) {
    this.draggedElement = piece;
    piece.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", piece.dataset.pieceId);
  }

  handlePlacedPieceDragEnd(e) {
    if (!this.draggedElement) return;

    this.draggedElement.classList.remove("dragging");

    // Update position
    const canvasRect = this.canvas.getBoundingClientRect();
    const x = e.clientX - canvasRect.left - 100;
    const y = e.clientY - canvasRect.top - 50;

    // Snap to grid
    const snappedX = Math.round(x / 40) * 40;
    const snappedY = Math.round(y / 40) * 40;

    // Ensure piece stays within canvas
    const maxX = canvasRect.width - 200;
    const maxY = canvasRect.height - 100;
    const finalX = Math.max(0, Math.min(snappedX, maxX));
    const finalY = Math.max(0, Math.min(snappedY, maxY));

    this.draggedElement.style.left = `${finalX}px`;
    this.draggedElement.style.top = `${finalY}px`;

    // Update state
    const pieceData = this.placedPieces.find(
      (p) => p.id === this.draggedElement.dataset.pieceId,
    );
    if (pieceData) {
      pieceData.x = finalX;
      pieceData.y = finalY;
    }

    this.draggedElement = null;

    // Redraw connections
    this.redrawConnections();
  }

  handlePieceClick(piece) {
    if (!this.selectedPiece) {
      // First selection
      this.selectedPiece = piece;
      piece.classList.add("selected");
    } else if (this.selectedPiece === piece) {
      // Deselect
      piece.classList.remove("selected");
      this.selectedPiece = null;
    } else {
      // Second selection - create connection
      const piece1Id = this.selectedPiece.dataset.pieceId;
      const piece2Id = piece.dataset.pieceId;

      // Check if connection already exists
      const exists = this.connections.some(
        (c) =>
          (c.from === piece1Id && c.to === piece2Id) ||
          (c.from === piece2Id && c.to === piece1Id),
      );

      if (!exists) {
        this.createConnection(piece1Id, piece2Id);
      }

      // Deselect
      this.selectedPiece.classList.remove("selected");
      this.selectedPiece = null;
    }
  }

  createConnection(fromId, toId) {
    const connection = {
      id: `conn-${this.connections.length}`,
      from: fromId,
      to: toId,
    };

    this.connections.push(connection);
    this.drawConnection(connection);
    this.updateStats();
  }

  drawConnection(connection) {
    const fromPiece = this.placedPieces.find((p) => p.id === connection.from);
    const toPiece = this.placedPieces.find((p) => p.id === connection.to);

    if (!fromPiece || !toPiece) return;

    // Calculate center points
    const fromX = fromPiece.x + 100; // Half of piece width
    const fromY = fromPiece.y + 40; // Approximate center height
    const toX = toPiece.x + 100;
    const toY = toPiece.y + 40;

    // Create SVG line
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", fromX);
    line.setAttribute("y1", fromY);
    line.setAttribute("x2", toX);
    line.setAttribute("y2", toY);
    line.setAttribute("stroke", "#308ce8");
    line.setAttribute("stroke-width", "2");
    line.setAttribute("stroke-dasharray", "5,5");
    line.classList.add("connection-line");
    line.dataset.connectionId = connection.id;
    line.style.pointerEvents = "stroke";

    // Click to delete connection
    line.addEventListener("click", (e) => {
      e.stopPropagation();
      this.deleteConnection(connection.id);
    });

    this.connectionsSvg.appendChild(line);
  }

  deleteConnection(connectionId) {
    // Remove from state
    this.connections = this.connections.filter((c) => c.id !== connectionId);

    // Remove from DOM
    const line = this.connectionsSvg.querySelector(
      `[data-connection-id="${connectionId}"]`,
    );
    if (line) {
      line.remove();
    }

    this.updateStats();
  }

  redrawConnections() {
    // Clear all lines
    this.connectionsSvg.innerHTML = "";

    // Redraw all connections
    this.connections.forEach((connection) => {
      this.drawConnection(connection);
    });
  }

  updateStats() {
    document.getElementById("piece-count").textContent =
      this.placedPieces.length;
    document.getElementById("connection-count").textContent =
      this.connections.length;
  }

  checkInstructions() {
    const overlay = document.getElementById("instructions-overlay");
    if (this.placedPieces.length > 0) {
      overlay.classList.add("hidden");
    } else {
      overlay.classList.remove("hidden");
    }
  }

  setupButtons() {
    // Reset button
    document.getElementById("btn-reset").addEventListener("click", () => {
      this.reset();
    });

    // Save button
    document.getElementById("btn-save").addEventListener("click", () => {
      this.save();
    });

    // Visualize button
    document.getElementById("btn-visualize").addEventListener("click", () => {
      this.visualize();
    });

    // Canvas click to deselect
    this.canvas.addEventListener("click", (e) => {
      if (e.target === this.canvas || e.target.id === "connections-svg") {
        if (this.selectedPiece) {
          this.selectedPiece.classList.remove("selected");
          this.selectedPiece = null;
        }
      }
    });
  }

  reset() {
    if (this.placedPieces.length === 0) return;

    if (confirm("Bạn có chắc muốn xóa tất cả và bắt đầu lại?")) {
      // Remove all placed pieces
      this.placedPieces.forEach((piece) => {
        piece.element.remove();
      });

      // Clear state
      this.placedPieces = [];
      this.connections = [];
      this.selectedPiece = null;
      this.pieceIdCounter = 0;

      // Clear SVG
      this.connectionsSvg.innerHTML = "";

      this.updateStats();
      this.checkInstructions();
    }
  }

  save() {
    if (this.placedPieces.length === 0) {
      alert("Chưa có mảnh ghép nào để lưu!");
      return;
    }

    const data = {
      pieces: this.placedPieces.map((p) => ({
        category: p.category,
        conceptId: p.conceptId,
        x: p.x,
        y: p.y,
      })),
      connections: this.connections.map((c) => ({
        from: this.placedPieces.findIndex((p) => p.id === c.from),
        to: this.placedPieces.findIndex((p) => p.id === c.to),
      })),
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `the-gioi-quan-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
  }

  visualize() {
    if (this.placedPieces.length === 0) {
      alert("Hãy thêm ít nhất một mảnh ghép trước khi xem sơ đồ!");
      return;
    }

    // Show modal
    const modal = document.getElementById("visualization-modal");
    modal.classList.remove("hidden");

    // Trigger visualization (handled by worldview-visualization.js)
    if (window.WorldviewVisualization) {
      window.WorldviewVisualization.generate(
        this.placedPieces,
        this.connections,
      );
    }
  }

  getGameState() {
    return {
      pieces: this.placedPieces,
      connections: this.connections,
    };
  }
}

// Initialize game when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.game = new WorldviewGame();
});
