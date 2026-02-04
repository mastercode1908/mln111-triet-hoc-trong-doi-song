// Auto-generate element card descriptions based on actual effects
// This ensures descriptions always match the actual effects

function updateElementDescriptions() {
    const elements = document.querySelectorAll('[data-element]');

    elements.forEach(el => {
        const elementId = el.getAttribute('data-element');
        const elementData = window.ELEMENT_EFFECTS[elementId];

        if (!elementData) return;

        // Find the description div
        const descDiv = el.querySelector('.text-xs.text-slate-600');
        if (!descDiv) return;

        // Generate description from effects
        const effectStrings = [];

        // Always show quantity first if not 0
        if (elementData.effects.quantity !== 0) {
            const sign = elementData.effects.quantity > 0 ? '+' : '';
            effectStrings.push(`${sign}${elementData.effects.quantity} Lượng`);
        }

        // Show other effects (max 2 more)
        const statLabels = {
            knowledge: 'Tri thức',
            softSkills: 'Kỹ năng mềm',
            creativity: 'Sáng tạo',
            mentalHealth: 'Tinh thần'
        };

        let statsShown = 0;
        for (const [stat, value] of Object.entries(elementData.effects)) {
            if (stat === 'quantity' || value === 0 || statsShown >= 2) continue;

            const sign = value > 0 ? '+' : '';
            const label = statLabels[stat] || stat;
            const colorClass = value > 0 ? '' : 'text-red-600';

            if (colorClass) {
                effectStrings.push(`<span class="${colorClass}">${sign}${value} ${label}</span>`);
            } else {
                effectStrings.push(`${sign}${value} ${label}`);
            }

            statsShown++;
        }

        // Update description
        descDiv.innerHTML = effectStrings.join(', ');
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    // Wait for ELEMENT_EFFECTS to load
    if (window.ELEMENT_EFFECTS) {
        updateElementDescriptions();
    } else {
        setTimeout(updateElementDescriptions, 100);
    }
});

// Also export for manual calling
if (typeof window !== 'undefined') {
    window.updateElementDescriptions = updateElementDescriptions;
}
