// Character State System for Development Map Game
// Manages character progression through quantity->quality transformation

class CharacterState {
    constructor() {
        this.states = {
            student_year1: {
                id: 'student_year1',
                name: 'Sinh viên năm 1',
                description: 'Mới bắt đầu, đang làm quen',
                icon: 'school',
                minQuantity: 0,
                maxQuantity: 50,
                color: '#3b82f6'
            },
            student_skilled: {
                id: 'student_skilled',
                name: 'Sinh viên có kỹ năng',
                description: 'Đã có nền tảng, tự tin hơn',
                icon: 'workspace_premium',
                minQuantity: 50,
                maxQuantity: 100,
                color: '#10b981'
            },
            intern: {
                id: 'intern',
                name: 'Thực tập sinh',
                description: 'Áp dụng kiến thức thực tế',
                icon: 'work',
                minQuantity: 150,
                maxQuantity: 200,
                color: '#f59e0b'
            },
            employed: {
                id: 'employed',
                name: 'Có việc làm ổn định',
                description: 'Hoàn thành sự biến đổi',
                icon: 'verified',
                minQuantity: 200,
                maxQuantity: 250,
                color: '#8b5cf6'
            }
        };

        this.currentState = this.states.student_year1;
        this.quantityLevel = 0;
        this.semester = 1;

        this.skills = {
            knowledge: 10,        // 📚 Tri thức
            softSkills: 5,       // 💬 Kỹ năng mềm
            creativity: 5,       // 💡 Sáng tạo
            mentalHealth: 70    // 🧘 Sức khỏe tinh thần
        };
    }

    // Get current state based on quantity level
    getCurrentState() {
        for (const state of Object.values(this.states)) {
            if (this.quantityLevel >= state.minQuantity && this.quantityLevel < state.maxQuantity) {
                return state;
            }
        }
        return this.states.employed; // If 100%
    }

    // Update skills based on element effects
    updateSkills(effects) {
        const previousState = this.currentState;

        // Update skills with bounds: quantity [0-250], skills [0-200]
        Object.keys(effects).forEach(skill => {
            if (skill === 'quantity') {
                this.quantityLevel = Math.max(0, Math.min(250, this.quantityLevel + effects.quantity));
            } else if (this.skills.hasOwnProperty(skill)) {
                this.skills[skill] = Math.max(0, Math.min(200, this.skills[skill] + effects[skill]));
            }
        });

        // Check for state transformation
        const newState = this.getCurrentState();
        const transformed = previousState.id !== newState.id;

        if (transformed) {
            this.currentState = newState;
            this.onStateTransform(previousState, newState);
        }

        return {
            transformed,
            previousState,
            newState: this.currentState
        };
    }

    // Callback when state transforms
    onStateTransform(oldState, newState) {
        console.log(`🎉 State transformed from ${oldState.name} to ${newState.name}!`);

        // Trigger transformation event
        const event = new CustomEvent('stateTransformed', {
            detail: { oldState, newState }
        });
        document.dispatchEvent(event);
    }

    // Get skill level category
    getSkillLevel(value) {
        if (value >= 80) return { label: 'Xuất sắc', color: '#10b981' };
        if (value >= 60) return { label: 'Tốt', color: '#3b82f6' };
        if (value >= 40) return { label: 'Trung bình', color: '#f59e0b' };
        return { label: 'Cần cải thiện', color: '#ef4444' };
    }

    // Check if player achieved balance
    isBalanced() {
        const skills = Object.values(this.skills);
        return skills.every(skill => skill >= 60);
    }

    // Get current semester based on quantity
    getCurrentSemester() {
        return Math.floor(this.quantityLevel / 12.5) + 1; // 8 semesters max
    }

    // Export state for saving
    export() {
        return {
            currentStateId: this.currentState.id,
            quantityLevel: this.quantityLevel,
            semester: this.semester,
            skills: { ...this.skills }
        };
    }

    // Import saved state
    import(data) {
        this.currentState = this.states[data.currentStateId] || this.states.student_year1;
        this.quantityLevel = data.quantityLevel || 0;
        this.semester = data.semester || 1;
        this.skills = data.skills || {
            knowledge: 10,
            softSkills: 5,
            creativity: 5,
            mentalHealth: 70
        };
    }
}

// Export for use in main game
if (typeof window !== 'undefined') {
    window.CharacterState = CharacterState;
}
