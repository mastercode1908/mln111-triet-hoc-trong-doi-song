// Element Effects Configuration - Simplified to 4 Core Stats
// Defines the effects of each draggable element on character

const ELEMENT_EFFECTS = {
    study: {
        id: 'study',
        icon: 'menu_book',
        name: 'Học tập',
        description: 'Tích lũy kiến thức từ giáo trình',
        color: '#3b82f6',
        effects: {
            quantity: 5,
            knowledge: 10,
            creativity: 5,
        },
        tip: 'Học nhiều quá cũng mệt đấy!'
    },

    time: {
        id: 'time',
        icon: 'schedule',
        name: 'Thời gian',
        description: 'Kiên trì theo thời gian',
        color: '#6366f1',
        effects: {
            quantity: 3,
            knowledge: 2,
            creativity: 2,
        },
        tip: 'Thời gian là yếu tố quan trọng!'
    },

    perseverance: {
        id: 'perseverance',
        icon: 'trending_up',
        name: 'Kiên trì',
        description: 'Không bỏ cuộc, tiếp tục cố gắng',
        color: '#8b5cf6',
        effects: {
            quantity: 8,
            knowledge: 5,
            mentalHealth: 5
        },
        tip: 'Kiên trì là chìa khóa thành công!'
    },

    pressure: {
        id: 'pressure',
        icon: 'warning',
        name: 'Áp lực',
        description: 'Áp lực thúc đẩy tiến bộ',
        color: '#ef4444',
        effects: {
            quantity: 4,
            knowledge: 3,
            mentalHealth: -10
        },
        tip: 'Áp lực vừa phải tốt, quá nhiều hại!'
    },

    social: {
        id: 'social',
        icon: 'groups',
        name: 'Giao tiếp',
        description: 'Kết nối với bạn bè',
        color: '#ec4899',
        effects: {
            quantity: 4,
            creativity: 3,
            softSkills: 10
        },
        tip: 'Con người là sinh vật xã hội!'
    },

    rest: {
        id: 'rest',
        icon: 'hotel',
        name: 'Nghỉ ngơi',
        description: 'Thư giãn, phục hồi năng lượng',
        color: '#8b5cf6',
        effects: {
            quantity: 0,
            knowledge: 0,
            creativity: 0,
            softSkills: 0,
            mentalHealth: 15
        },
        tip: 'Không tăng lượng, nhưng cần thiết!'
    },

    parttime: {
        id: 'parttime',
        icon: 'attach_money',
        name: 'Làm thêm',
        description: 'Kiếm tiền nhưng ảnh hưởng học tập',
        color: '#f97316',
        effects: {
            quantity: 3,
            knowledge: -3,
            softSkills: 8
        },
        tip: 'Kiếm tiền nhưng cần cân bằng thời gian!'
    },

    entertainment: {
        id: 'entertainment',
        icon: 'videogame_asset',
        name: 'Giải trí',
        description: 'Chơi game, xem phim',
        color: '#a855f7',
        effects: {
            mentalHealth: 12,
            knowledge: -2,
        },
        tip: 'Giải trí điều độ, tránh nghiện!'
    },

    socialmedia: {
        id: 'socialmedia',
        icon: 'phone_iphone',
        name: 'Mạng xã hội',
        description: 'Lướt mạng, kết nối online',
        color: '#0ea5e9',
        effects: {
            quantity: 1,
            knowledge: -3,
            creativity: 3,
        },
        tip: 'Dùng mạng xã hội có chọn lọc!'
    },

    selfstudy: {
        id: 'selfstudy',
        icon: 'school',
        name: 'Tự học',
        description: 'Tìm hiểu, nghiên cứu tự giác',
        color: '#3b82f6',
        effects: {
            quantity: 5,
            knowledge: 5,
            creativity: 7,
        },
        tip: 'Tự học là phát triển bền vững!'
    },

    sports: {
        id: 'sports',
        icon: 'sports_soccer',
        name: 'Thể thao',
        description: 'Vận động, giảm căng thẳng',
        color: '#16a34a',
        effects: {
            quantity: 2,
            softSkills: 5,
            mentalHealth: 10
        },
        tip: 'Cơ thể khỏe, tinh thần tỉnh táo!'
    },

    club: {
        id: 'club',
        icon: 'groups_2',
        name: 'Hoạt động CLB',
        description: 'Networking, kỹ năng lãnh đạo',
        color: '#db2777',
        effects: {
            quantity: 5,
            knowledge: 2,
            softSkills: 12,
        },
        tip: 'CLB giúp phát triển kỹ năng mềm!'
    },

    familyvisit: {
        id: 'familyvisit',
        icon: 'family_star',
        name: 'Thăm ông bà',
        description: 'Trò chuyện, quan tâm gia đình',
        color: '#be185d',
        effects: {
            quantity: 5,
            softSkills: 3,
            mentalHealth: 15
        },
        tip: 'Gia đình luôn quan trọng nhất!'
    },

    volunteering: {
        id: 'volunteering',
        icon: 'volunteer_activism',
        name: 'Tình nguyện',
        description: 'Giúp đỡ cộng đồng',
        color: '#0891b2',
        effects: {
            quantity: 4,
            knowledge: 3,
            softSkills: 5,
        },
        tip: 'Cho đi là còn mãi!'
    },

    community: {
        id: 'community',
        icon: 'real_estate_agent',
        name: 'Cộng đồng',
        description: 'Xây dựng cộng đồng',
        color: '#0d9488',
        effects: {
            quantity: 3,
            knowledge: 2,
            softSkills: 10,
        },
        tip: 'Cùng nhau xây dựng cộng đồng!'
    },

    cooking: {
        id: 'cooking',
        icon: 'cooking',
        name: 'Nấu ăn',
        description: 'Tự nấu, chăm sóc bản thân',
        color: '#f59e0b',
        effects: {
            quantity: 2,
            softSkills: 5,
            mentalHealth: 5
        },
        tip: 'Tự nấu ăn là kỹ năng sống!'
    }
};

// Helper function
function getElementData(elementId) {
    return ELEMENT_EFFECTS[elementId] || null;
}

// Export
if (typeof window !== 'undefined') {
    window.ELEMENT_EFFECTS = ELEMENT_EFFECTS;
    window.getElementData = getElementData;
}


// === RANDOM EVENT EFFECTS (Simplified to 4 stats) ===

const EVENT_EFFECTS = {
    failExam: {
        quantity: -15,
        knowledge: -10,
        creativity: 0,
        softSkills: 0,
        mentalHealth: -20
    },
    breakup: {
        quantity: -8,
        knowledge: 0,
        creativity: -10,
        softSkills: -8,
        mentalHealth: -25
    },
    sickness: {
        quantity: -10,
        knowledge: -5,
        creativity: 0,
        softSkills: 0,
        mentalHealth: -15
    },
    gameAddiction: {
        quantity: -12,
        knowledge: -15,
        creativity: 0,
        softSkills: -10,
        mentalHealth: -10
    }
};

if (typeof window !== 'undefined') {
    window.EVENT_EFFECTS = EVENT_EFFECTS;
}


// === SKILL INFO (Simplified to 4 stats) ===

const SKILL_INFO = {
    knowledge: {
        name: 'Tri thức',
        icon: 'menu_book',
        description: 'Kiến thức chuyên môn từ học tập',
        color: '#3b82f6'
    },
    softSkills: {
        name: 'Kỹ năng mềm',
        icon: 'groups',
        description: 'Giao tiếp, làm việc nhóm, lãnh đạo',
        color: '#ec4899'
    },
    creativity: {
        name: 'Sáng tạo',
        icon: 'lightbulb',
        description: 'Tư duy sáng tạo, giải quyết vấn đề',
        color: '#f59e0b'
    },
    mentalHealth: {
        name: 'Tinh thần',
        icon: 'favorite',
        description: 'Sức khỏe tinh thần, động lực',
        color: '#10b981'
    }
};

if (typeof window !== 'undefined') {
    window.SKILL_INFO = SKILL_INFO;
}
