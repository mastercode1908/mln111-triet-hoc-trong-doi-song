// Philosophy Quiz Data - MLN111
// Questions about Dialectical Materialism for Development Map Game

const QUIZ_QUESTIONS = [
    // === QUY LUẬT LƯỢNG - CHẤT (8 câu) ===
    {
        id: 'q1',
        category: 'luong-chat',
        question: 'Quy luật Lượng-Chất trong triết học duy vật biện chứng nói về điều gì?',
        options: [
            'Tích lũy về lượng đến một ngưỡng nhất định sẽ dẫn đến bước nhảy về chất',
            'Chất lượng quan trọng hơn số lượng trong mọi trường hợp',
            'Lượng và chất là hai yếu tố hoàn toàn độc lập không liên quan'
        ],
        correct: 0,
        explanation: 'Quy luật Lượng-Chất chỉ ra rằng sự tích lũy về lượng đến một điểm nút (ngưỡng) nhất định sẽ tạo ra bước nhảy về chất - một sự biến đổi căn bản.',
        bonus: { quantity: 12, knowledge: 5 },
        penalty: { quantity: -5 }
    },
    {
        id: 'q2',
        category: 'luong-chat',
        question: 'Trong quá trình học tập, nếu bạn chỉ học nhiều giờ nhưng không hiểu bài, bạn đã vi phạm nguyên tắc nào?',
        options: [
            'Chỉ tích lũy lượng mà không chú ý đến chất',
            'Tích lũy đủ cả lượng và chất',
            'Không có vấn đề gì, học nhiều là tốt'
        ],
        correct: 0,
        explanation: 'Học nhiều giờ (lượng) nhưng không hiểu (chất thấp) là vi phạm quy luật Lượng-Chất. Cần cân bằng giữa thời gian học và chất lượng tiếp thu.',
        bonus: { quantity: 10, knowledge: 8 },
        penalty: { knowledge: -3 }
    },
    {
        id: 'q3',
        category: 'luong-chat',
        question: '"Điểm nút" trong quy luật Lượng-Chất là gì?',
        options: [
            'Ngưỡng mà tại đó sự tích lũy lượng chuyển thành bước nhảy chất',
            'Điểm kết thúc của quá trình học tập',
            'Mức điểm tối thiểu để đạt môn học'
        ],
        correct: 0,
        explanation: 'Điểm nút là ngưỡng quan trọng - khi tích lũy lượng đạt đến đây, sẽ xảy ra bước nhảy về chất (chuyển biến căn bản).',
        bonus: { quantity: 8, creativity: 5 },
        penalty: { quantity: -3 }
    },
    {
        id: 'q4',
        category: 'luong-chat',
        question: 'Ví dụ nào sau đây thể hiện đúng quy luật Lượng-Chất?',
        options: [
            'Học tích lũy kiến thức từng ngày → Hiểu sâu về một lĩnh vực',
            'Đọc sách càng nhiều càng tốt không cần suy nghĩ',
            'Chỉ cần chất lượng, không cần số lượng'
        ],
        correct: 0,
        explanation: 'Tích lũy kiến thức đều đặn (lượng) sẽ dẫn đến hiểu biết sâu sắc (chất) - đây là ví dụ điển hình của quy luật Lượng-Chất.',
        bonus: { quantity: 10, knowledge: 6 },
        penalty: { quantity: -4 }
    },
    {
        id: 'q5',
        category: 'luong-chat',
        question: 'Tại sao không thể "nhảy cóc" - bỏ qua giai đoạn tích lũy lượng?',
        options: [
            'Vì bước nhảy chất chỉ xảy ra khi đã tích lũy đủ lượng',
            'Vì luôn có thể đạt được mọi thứ ngay lập tức',
            'Vì lượng không quan trọng'
        ],
        correct: 0,
        explanation: 'Không thể bỏ qua tích lũy lượng vì bước nhảy chất là kết quả tất yếu của sự tích lũy về lượng. Không có lượng thì không có chất.',
        bonus: { quantity: 15, knowledge: 5, creativity: 3 },
        penalty: { quantity: -5 }
    },
    {
        id: 'q6',
        category: 'luong-chat',
        question: 'Sinh viên A học đều 2 giờ/ngày trong 3 tháng và hiểu sâu. Sinh viên B học dồn 180 giờ trong 1 tuần cuối. Ai áp dụng đúng quy luật Lượng-Chất?',
        options: [
            'Sinh viên A - tích lũy đều đặn tạo biến đổi chất bền vững',
            'Sinh viên B - học nhiều giờ hơn nên tốt hơn',
            'Cả hai đều đúng'
        ],
        correct: 0,
        explanation: 'Sinh viên A tích lũy đều đặn (lượng) qua thời gian dài, tạo nên sự thay đổi chất bền vững. Sinh viên B chỉ tích lũy lượng mà thiếu quá trình chuyển hóa chất.',
        bonus: { quantity: 12, knowledge: 8, mentalHealth: 5 },
        penalty: { knowledge: -4 }
    },
    {
        id: 'q7',
        category: 'luong-chat',
        question: 'Bước nhảy từ "Sinh viên năm 1" thành "Sinh viên có kỹ năng" trong game là ví dụ về điều gì?',
        options: [
            'Bước nhảy về chất sau khi tích lũy đủ lượng',
            'Sự thay đổi ngẫu nhiên',
            'Chỉ là thay đổi tên gọi'
        ],
        correct: 0,
        explanation: 'Đây là bước nhảy về chất - một sự biến đổi căn bản về trình độ sau khi tích lũy đủ lượng (kiến thức, kỹ năng).',
        bonus: { quantity: 10, creativity: 8 },
        penalty: { quantity: -3 }
    },
    {
        id: 'q8',
        category: 'luong-chat',
        question: 'Trong game, tại sao phải kéo thả nhiều lần (tích lũy lượng) mới có transformation (biến đổi chất)?',
        options: [
            'Để thể hiện quy luật Lượng-Chất: tích lũy lượng → biến đổi chất',
            'Để game khó hơn',
            'Không có lý do đặc biệt'
        ],
        correct: 0,
        explanation: 'Game mô phỏng quy luật Lượng-Chất: mỗi hành động là tích lũy lượng, và khi đạt ngưỡng sẽ xảy ra transformation (bước nhảy chất).',
        bonus: { quantity: 15, knowledge: 10, creativity: 5 },
        penalty: { quantity: -5 }
    },

    // === QUY LUẬT MÂU THUẪN (7 câu) ===
    {
        id: 'q9',
        category: 'mau-thuan',
        question: 'Mâu thuẫn trong triết học biện chứng là gì?',
        options: [
            'Sự đấu tranh và thống nhất giữa các mặt đối lập trong cùng sự vật',
            'Sự xung đột không thể giải quyết',
            'Sự khác biệt đơn thuần giữa hai sự vật'
        ],
        correct: 0,
        explanation: 'Mâu thuẫn biện chứng là sự thống nhất và đấu tranh giữa các mặt đối lập trong cùng một sự vật, là nguồn gốc và động lực phát triển.',
        bonus: { quantity: 10, knowledge: 8, creativity: 5 },
        penalty: { knowledge: -4 }
    },
    {
        id: 'q10',
        category: 'mau-thuan',
        question: 'Trong game, "Học tập" (+tri thức, -tinh thần) và "Nghỉ ngơi" (+tinh thần, -lượng) thể hiện điều gì?',
        options: [
            'Mâu thuẫn cần được cân bằng để phát triển toàn diện',
            'Hai hành động không liên quan',
            'Chỉ nên chọn một trong hai'
        ],
        correct: 0,
        explanation: 'Đây là mâu thuẫn điển hình: học tập vs nghỉ ngơi. Cần cân bằng cả hai để phát triển bền vững, không thể chỉ tập trung vào một mặt.',
        bonus: { quantity: 12, mentalHealth: 8, creativity: 5 },
        penalty: { mentalHealth: -5 }
    },
    {
        id: 'q11',
        category: 'mau-thuan',
        question: 'Tại sao mâu thuẫn là động lực phát triển?',
        options: [
            'Vì sự đấu tranh giữa các mặt đối lập tạo ra sự vận động và phát triển',
            'Vì mâu thuẫn luôn tạo ra xung đột',
            'Vì mâu thuẫn không quan trọng'
        ],
        correct: 0,
        explanation: 'Mâu thuẫn là động lực phát triển vì sự đấu tranh giữa các mặt đối lập thúc đẩy sự vật vận động, thay đổi và phát triển.',
        bonus: { quantity: 10, knowledge: 10, creativity: 8 },
        penalty: { knowledge: -5 }
    },
    {
        id: 'q12',
        category: 'mau-thuan',
        question: 'Khi stats "Tinh thần" xuống thấp trong game, bạn nên làm gì theo quy luật mâu thuẫn?',
        options: [
            'Cân bằng lại bằng "Nghỉ ngơi" hoặc "Giao tiếp" để giải quyết mâu thuẫn',
            'Tiếp tục "Học tập" để tăng lượng',
            'Bỏ qua, không cần quan tâm'
        ],
        correct: 0,
        explanation: 'Khi tinh thần thấp, cần giải quyết mâu thuẫn bằng cách nghỉ ngơi hoặc giao tiếp để cân bằng lại. Đây là cách giải quyết mâu thuẫn hợp lý.',
        bonus: { mentalHealth: 15, creativity: 5 },
        penalty: { mentalHealth: -5 }
    },
    {
        id: 'q13',
        category: 'mau-thuan',
        question: 'Element "Áp lực" (+lượng, -tinh thần) thể hiện mâu thuẫn gì?',
        options: [
            'Mâu thuẫn giữa động lực phát triển và sức khỏe tinh thần',
            'Không có mâu thuẫn',
            'Chỉ có tác động tiêu cực'
        ],
        correct: 0,
        explanation: 'Áp lực vừa là động lực (tăng lượng) vừa gây stress (giảm tinh thần) - đây là mâu thuẫn điển hình cần được quản lý hợp lý.',
        bonus: { quantity: 10, knowledge: 8, mentalHealth: 5 },
        penalty: { knowledge: -4 }
    },
    {
        id: 'q14',
        category: 'mau-thuan',
        question: 'Làm sao để giải quyết mâu thuẫn giữa "Học nhiều" và "Sức khỏe tinh thần"?',
        options: [
            'Cân bằng giữa học tập và nghỉ ngơi, không cực đoan',
            'Chỉ tập trung học thôi',
            'Chỉ nghỉ ngơi, bỏ học'
        ],
        correct: 0,
        explanation: 'Giải quyết mâu thuẫn bằng cách cân bằng, không đi cực đoan. Vừa học vừa nghỉ hợp lý là cách tốt nhất.',
        bonus: { quantity: 12, mentalHealth: 10, creativity: 5 },
        penalty: { mentalHealth: -5 }
    },
    {
        id: 'q15',
        category: 'mau-thuan',
        question: 'Trong các elements của game, cặp nào thể hiện mâu thuẫn rõ nhất?',
        options: [
            'Học tập (tăng tri thức, giảm tinh thần) vs Nghỉ ngơi (tăng tinh thần, không tăng lượng)',
            'Thời gian vs Sáng tạo',
            'Làm thêm vs Tình nguyện'
        ],
        correct: 0,
        explanation: 'Cặp Học tập - Nghỉ ngơi thể hiện mâu thuẫn điển hình: một bên tích lũy kiến thức nhưng mệt mỏi, một bên phục hồi tinh thần nhưng không tiến bộ.',
        bonus: { quantity: 10, creativity: 8 },
        penalty: { quantity: -3 }
    },

    // === QUY LUẬT PHỦ ĐỊNH CỦA PHỦ ĐỊNH (5 câu) ===
    {
        id: 'q16',
        category: 'phu-dinh',
        question: 'Quy luật Phủ định của Phủ định nói về điều gì?',
        options: [
            'Sự phát triển theo hình xoáy ốc: phủ định nhưng kế thừa cái cũ ở mức cao hơn',
            'Phủ định hoàn toàn, loại bỏ hết cái cũ',
            'Quay lại trạng thái ban đầu giống hệt'
        ],
        correct: 0,
        explanation: 'Phủ định biện chứng là phủ định nhưng có kế thừa, phát triển theo hình xoáy ốc lên cao hơn, không phải quay lại điểm xuất phát cũ.',
        bonus: { quantity: 15, knowledge: 10, creativity: 8 },
        penalty: { knowledge: -5 }
    },
    {
        id: 'q17',
        category: 'phu-dinh',
        question: 'Khi bạn từ "Sinh viên năm 1" → "Sinh viên có kỹ năng" → "Thực tập sinh" → "Có việc làm", đây là ví dụ về quy luật nào?',
        options: [
            'Phủ định của Phủ định - phát triển xoáy ốc lên cao',
            'Chỉ là thay đổi tuần tự',
            'Không liên quan đến quy luật nào'
        ],
        correct: 0,
        explanation: 'Đây là phát triển theo hình xoáy ốc: mỗi giai đoạn phủ định giai đoạn trước nhưng kế thừa và nâng lên mức cao hơn.',
        bonus: { quantity: 12, knowledge: 8, creativity: 10 },
        penalty: { knowledge: -4 }
    },
    {
        id: 'q18',
        category: 'phu-dinh',
        question: 'Tại sao sau khi "phủ định" (transformation), bạn không quay lại trạng thái ban đầu giống hệt?',
        options: [
            'Vì phủ định biện chứng là kế thừa và phát triển lên cao hơn',
            'Vì có thể quay lại giống hệt',
            'Vì không có sự thay đổi thực sự'
        ],
        correct: 0,
        explanation: 'Phủ định biện chứng không phải quay vòng tròn mà là xoáy ốc: kế thừa những gì tốt của cũ và phát triển lên mức cao hơn.',
        bonus: { quantity: 10, creativity: 10 },
        penalty: { creativity: -5 }
    },
    {
        id: 'q19',
        category: 'phu-dinh',
        question: 'Sự khác nhau giữa "phủ định siêu hình" và "phủ định biện chứng" là gì?',
        options: [
            'Phủ định siêu hình loại bỏ hoàn toàn, phủ định biện chứng kế thừa và phát triển',
            'Không có sự khác biệt',
            'Cả hai đều loại bỏ hoàn toàn cái cũ'
        ],
        correct: 0,
        explanation: 'Phủ định siêu hình phủ nhận tuyệt đối. Phủ định biện chứng phủ nhận nhưng kế thừa cái hợp lý và phát triển lên.',
        bonus: { quantity: 12, knowledge: 10, creativity: 8 },
        penalty: { knowledge: -5 }
    },
    {
        id: 'q20',
        category: 'phu-dinh',
        question: 'Trong quá trình học, bạn học sai → nhận ra lỗi → học đúng cách. Đây là ví dụ về quy luật gì?',
        options: [
            'Phủ định của Phủ định - phủ nhận cách cũ nhưng tiếp thu kinh nghiệm',
            'Chỉ là sửa lỗi đơn thuần',
            'Không liên quan'
        ],
        correct: 0,
        explanation: 'Đây là phủ định biện chứng: phủ nhận cách học sai (phủ định lần 1), nhưng tiếp thu kinh nghiệm để học đúng hơn (phủ định lần 2, kế thừa kinh nghiệm).',
        bonus: { quantity: 10, knowledge: 10, creativity: 8 },
        penalty: { knowledge: -4 }
    },

    // === ỨNG DỤNG THỰC TẾ (10 câu) ===
    {
        id: 'q21',
        category: 'ung-dung',
        question: 'Bạn muốn giỏi lập trình. Theo quy luật Lượng-Chất, bạn nên làm gì?',
        options: [
            'Luyện tập code đều đặn mỗi ngày, tích lũy kinh nghiệm dần dần',
            'Chỉ đọc lý thuyết không cần thực hành',
            'Học dồn vào cuối tuần'
        ],
        correct: 0,
        explanation: 'Tích lũy đều đặn (lượng) qua thực hành hàng ngày sẽ dẫn đến thành thạo (chất). Đây là áp dụng quy luật Lượng-Chất.',
        bonus: { quantity: 10, knowledge: 8, creativity: 5 },
        penalty: { knowledge: -4 }
    },
    {
        id: 'q22',
        category: 'ung-dung',
        question: 'Bạn vừa muốn điểm cao, vừa muốn tham gia nhiều hoạt động CLB. Đây là mâu thuẫn gì?',
        options: [
            'Mâu thuẫn giữa học tập và hoạt động xã hội, cần cân bằng',
            'Không có mâu thuẫn, có thể làm cả hai dễ dàng',
            'Phải chọn một, không thể cả hai'
        ],
        correct: 0,
        explanation: 'Đây là mâu thuẫn điển hình của sinh viên. Cần quản lý thời gian hợp lý để cân bằng cả học tập và phát triển kỹ năng mềm.',
        bonus: { quantity: 8, softSkills: 8, mentalHealth: 5 },
        penalty: { softSkills: -3 }
    },
    {
        id: 'q23',
        category: 'ung-dung',
        question: 'Trong game, khi nào bạn nên sử dụng element "Áp lực"?',
        options: [
            'Khi cần boost lượng nhanh, nhưng phải cẩn thận với tinh thần',
            'Sử dụng liên tục để tăng lượng tối đa',
            'Không bao giờ nên dùng'
        ],
        correct: 0,
        explanation: 'Áp lực có thể tăng lượng nhanh nhưng giảm tinh thần. Cần dùng có chọn lọc và cân bằng với các elements phục hồi tinh thần.',
        bonus: { quantity: 10, mentalHealth: 5, creativity: 5 },
        penalty: { mentalHealth: -5 }
    },
    {
        id: 'q24',
        category: 'ung-dung',
        question: 'Element "Giao tiếp" (+kỹ năng mềm, +tinh thần) quan trọng như thế nào theo triết học?',
        options: [
            'Rất quan trọng - con người phát triển trong quan hệ xã hội',
            'Không quan trọng, chỉ cần học giỏi',
            'Chỉ là tùy chọn phụ'
        ],
        correct: 0,
        explanation: 'Theo triết học Mác, bản chất con người là tổng hòa các quan hệ xã hội. Giao tiếp phát triển kỹ năng mềm và tinh thần - không thể thiếu.',
        bonus: { softSkills: 10, mentalHealth: 10, creativity: 5 },
        penalty: { softSkills: -5 }
    },
    {
        id: 'q25',
        category: 'ung-dung',
        question: 'Tại sao cần có element "Nghỉ ngơi" trong game dù nó không tăng Lượng?',
        options: [
            'Vì cần cân bằng mâu thuẫn, phục hồi tinh thần để phát triển bền vững',
            'Vì game cần có nhiều lựa chọn',
            'Không cần thiết, nên bỏ đi'
        ],
        correct: 0,
        explanation: 'Nghỉ ngơi giải quyết mâu thuẫn giữa phấn đấu và sức khỏe. Dù không tăng lượng trực tiếp nhưng cần thiết cho phát triển bền vững.',
        bonus: { mentalHealth: 15, physicalHealth: 10 },
        penalty: { mentalHealth: -5 }
    },
    {
        id: 'q26',
        category: 'ung-dung',
        question: 'Trong thực tế, "thi trượt một môn" (event tiêu cực) có thể có mặt tích cực gì theo quy luật Phủ định?',
        options: [
            'Nhận ra lỗi sai, học cách học đúng hơn - phủ định để phát triển',
            'Hoàn toàn tiêu cực, không có gì tích cực',
            'Không liên quan đến quy luật'
        ],
        correct: 0,
        explanation: 'Theo phủ định biện chứng, thất bại có thể là bài học giúp phủ định cách học cũ và tìm cách học hiệu quả hơn.',
        bonus: { quantity: 10, knowledge: 10, creativity: 8 },
        penalty: { knowledge: -4 }
    },
    {
        id: 'q27',
        category: 'ung-dung',
        question: 'Element "Tình nguyện" (+kỹ năng mềm, +sức khỏe, +tinh thần) thể hiện quan điểm triết học nào?',
        options: [
            'Con người phát triển toàn diện khi cống hiến cho cộng đồng',
            'Chỉ là hoạt động tốt nhưng không liên quan triết',
            'Lãng phí thời gian'
        ],
        correct: 0,
        explanation: 'Tình nguyện thể hiện quan điểm phát triển toàn diện: vừa rèn kỹ năng, vừa tốt cho sức khỏe và tinh thần, vừa cống hiến xã hội.',
        bonus: { softSkills: 10, mentalHealth: 10, familyRelations: 5 },
        penalty: { softSkills: -4 }
    },
    {
        id: 'q28',
        category: 'ung-dung',
        question: 'Khi stats "Gia đình" thấp, điều này ảnh hưởng như thế nào theo triết học duy vật?',
        options: [
            'Ảnh hưởng tiêu cực vì con người không thể tồn tại độc lập khỏi quan hệ gia đình',
            'Không ảnh hưởng gì, gia đình không quan trọng',
            'Chỉ là con số trong game'
        ],
        correct: 0,
        explanation: 'Theo triết học duy vật, con người là sản phẩm của các mối quan hệ xã hội, trong đó gia đình là mối quan hệ cơ bản. Stats thấp phản ánh sự mất cân bằng.',
        bonus: { familyRelations: 15, mentalHealth: 8 },
        penalty: { familyRelations: -5 }
    },
    {
        id: 'q29',
        category: 'ung-dung',
        question: 'Element "Thể thao" (+sức khỏe, +tinh thần) quan trọng như thế nào trong phát triển toàn diện?',
        options: [
            'Rất quan trọng - thể chất là nền tảng cho mọi hoạt động tinh thần',
            'Không cần thiết, chỉ cần học',
            'Chỉ dành cho vận động viên'
        ],
        correct: 0,
        explanation: 'Theo triết học duy vật, thể chất và tinh thần có mối liên hệ biện chứng. Sức khỏe tốt là nền tảng cho học tập và làm việc hiệu quả.',
        bonus: { physicalHealth: 15, mentalHealth: 10, quantity: 5 },
        penalty: { physicalHealth: -5 }
    },
    {
        id: 'q30',
        category: 'ung-dung',
        question: 'Trong game, tại sao cần đa dạng hóa các elements thay vì chỉ spam một loại?',
        options: [
            'Vì phát triển toàn diện cần cân bằng nhiều mặt, tránh phát triển lệch lạc',
            'Vì game bắt buộc',
            'Không có lý do đặc biệt'
        ],
        correct: 0,
        explanation: 'Theo quan điểm phát triển toàn diện, cần cân bằng tri thức, kỹ năng, sức khỏe... Spam một loại dẫn đến phát triển lệch lạc.',
        bonus: { quantity: 10, knowledge: 8, creativity: 8, softSkills: 5 },
        penalty: { quantity: -5 }
    }
];

// Export for use in game
if (typeof window !== 'undefined') {
    window.QUIZ_QUESTIONS = QUIZ_QUESTIONS;
}
