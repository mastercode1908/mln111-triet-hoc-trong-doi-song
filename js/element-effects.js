// Element Effects Configuration
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
            softSkills: 0,
            mentalHealth: -3
        },
        tip: 'Học nhiều quá cũng mệt đấy!'
    },

    time: {
        id: 'time',
        icon: 'schedule',
        name: 'Thời gian',
        description: 'Thời gian trôi đi, kinh nghiệm tích lũy',
        color: '#6366f1',
        effects: {
            quantity: 3,
            knowledge: 2,
            creativity: 2,
            softSkills: 2,
            mentalHealth: 0
        },
        tip: 'Thời gian là yếu tố quan trọng'
    },

    perseverance: {
        id: 'perseverance',
        icon: 'fitness_center',
        name: 'Kiên trì',
        description: 'Nỗ lực không ngừng nghỉ',
        color: '#10b981',
        effects: {
            quantity: 8,
            knowledge: 5,
            creativity: 3,
            softSkills: 0,
            mentalHealth: 5
        },
        tip: 'Kiên trì là chìa khóa thành công!'
    },

    pressure: {
        id: 'pressure',
        icon: 'warning',
        name: 'Áp lực',
        description: 'Deadline, kỳ vọng gia đình',
        color: '#ef4444',
        effects: {
            quantity: 4,
            knowledge: 3,
            creativity: -2,
            softSkills: 0,
            mentalHealth: -10
        },
        tip: 'Cẩn thận! Áp lực giảm tinh thần'
    },

    social: {
        id: 'social',
        icon: 'groups',
        name: 'Giao tiếp',
        description: 'Tham gia hoạt động, gặp gỡ bạn bè',
        color: '#ec4899',
        effects: {
            quantity: 4,
            knowledge: 0,
            creativity: 3,
            softSkills: 10,
            mentalHealth: 5
        },
        tip: 'Kỹ năng mềm cũng quan trọng!'
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
            creativity: 5,
            softSkills: 0,
            mentalHealth: 15
        },
        tip: 'Không tăng lượng, nhưng cần thiết!'
    }
};

// Philosophy tooltips
const PHILOSOPHY_CONTENT = {
    quantityQuality: {
        title: "Quy luật Lượng - Chất",
        short: "Tích lũy đủ về lượng sẽ dẫn tới biến đổi về chất",
        explanation: "Sự tích lũy về lượng đến một ngưỡng nhất định (điểm nút) sẽ dẫn tới sự biến đổi về chất - một bước nhảy trong phát triển.",
        examples: [
            "Học tập đều đặn (lượng) → Hiểu sâu kiến thức (chất)",
            "Rèn luyện kỹ năng (lượng) → Thành thục nghề nghiệp (chất)",
            "Tích lũy kinh nghiệm (lượng) → Trưởng thành trong tư duy (chất)"
        ]
    },

    thresholds: {
        0: {
            message: "Bạn đang ở giai đoạn khởi đầu",
            advice: "Hãy kiên trì tích lũy!"
        },
        30: {
            message: "🎯 Bạn đã tích lũy đủ để có nền tảng ban đầu!",
            advice: "Sự biến đổi đầu tiên đã xảy ra",
            philosophy: "Đây là điểm nút đầu tiên - bước nhảy từ lượng sang chất"
        },
        60: {
            message: "🚀 Sự biến đổi rõ rệt! Bạn đã chuyển mình!",
            advice: "Kiến thức và kỹ năng đã đạt trình độ mới",
            philosophy: "Tích lũy liên tục đã tạo nên biến đổi chất lượng"
        },
        80: {
            message: "⭐ Gần hoàn thành hành trình phát triển!",
            advice: "Bạn đã sẵn sàng bước vào thế giới thực",
            philosophy: "Sự biến đổi chất đã đưa bạn lên tầm cao mới"
        },
        100: {
            message: "🏆 Hoàn thành! Bạn đã trải nghiệm quy luật lượng-chất!",
            advice: "Từ sinh viên → Người có việc làm",
            philosophy: "Quá trình tích lũy lượng liên tục đã tạo nên những bước nhảy chất lượng"
        }
    },

    dialectics: {
        balance: "Biện chứng duy vật nhấn mạnh sự cân bằng trong phát triển",
        contradiction: "Mâu thuẫn (học tập vs áp lực) là động lực phát triển",
        process: "Phát triển là quá trình, không phải bước nhảy đơn lẻ"
    }
};

// Skill descriptions
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

// Export for use in main game
if (typeof window !== 'undefined') {
    window.ELEMENT_EFFECTS = ELEMENT_EFFECTS;
    window.PHILOSOPHY_CONTENT = PHILOSOPHY_CONTENT;
    window.SKILL_INFO = SKILL_INFO;
}
