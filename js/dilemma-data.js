// Decision Dilemmas Data - BALANCED for 4 Stats Only
// Reduced bonus/penalty by 50% for better game balance
// Stats: quantity, knowledge, softSkills, creativity, mentalHealth
// Max bonus: +10, Max penalty: -6

const DILEMMA_SCENARIOS = [
    {
        id: 'd1',
        title: 'Bạn bè hay Học tập?',
        scenario: 'Bạn bè rủ đi chơi nhưng ngày mai có bài thi quan trọng. Bạn biết nếu không học sẽ khó đạt điểm tốt, nhưng bạn cũng không muốn bỏ lỡ khoảnh khắc vui vẻ với bạn bè.',
        philosophy: '📖 Quy luật Mâu thuẫn: Học tập vs Giải trí - Cần cân bằng hợp lý',
        choices: [
            {
                label: 'Đi chơi cùng bạn!',
                effects: { mentalHealth: 10, softSkills: 4, knowledge: -6 },
                consequence: 'Bạn có thời gian vui vẻ với bạn bè, tinh thần phấn chấn nhưng thiếu chuẩn bị cho kỳ thi. Có thể điểm số sẽ không như mong đợi.'
            },
            {
                label: 'Từ chối, ở nhà học',
                effects: { knowledge: 8, creativity: 3, mentalHealth: -4, softSkills: -3 },
                consequence: 'Bạn chuẩn bị tốt cho kỳ thi nhưng bỏ lỡ hoạt động xã hội. Bạn bè có thể hơi thất vọng.'
            },
            {
                label: 'Đi nửa buổi rồi về học',
                effects: { quantity: 5, mentalHealth: 6, knowledge: 4, softSkills: 3 },
                consequence: 'Bạn cân bằng được cả hai mặt nhưng hơi mệt mỏi. Đây là lựa chọn biện chứng - không đi cực đoan.'
            }
        ]
    },
    {
        id: 'd2',
        title: 'Làm thêm hay Tập trung học?',
        scenario: 'Gia đình đang gặp khó khăn tài chính. Bạn có cơ hội làm thêm thu nhập ổn định nhưng sẽ mất thời gian học tập và nghỉ ngơi.',
        philosophy: '⚖️ Quy luật Mâu thuẫn: Trách nhiệm vs Phát triển bản thân',
        choices: [
            {
                label: 'Làm thêm toàn thời gian',
                effects: { quantity: 4, softSkills: 6, knowledge: -5, mentalHealth: -6 },
                consequence: 'Bạn giúp được gia đình nhưng ảnh hưởng đến học tập và sức khỏe. Cần cân nhắc lâu dài.'
            },
            {
                label: 'Từ chối, tập trung học',
                effects: { knowledge: 8, creativity: 4, mentalHealth: 3 },
                consequence: 'Bạn phát triển tốt nhưng gia đình vẫn khó khăn. Có cảm giác áy náy.'
            },
            {
                label: 'Làm bán thời gian cuối tuần',
                effects: { quantity: 6, softSkills: 4, knowledge: 3 },
                consequence: 'Giải pháp cân bằng - vừa hỗ trợ gia đình vừa duy trì học tập, tuy hơi vất vả.'
            }
        ]
    },
    {
        id: 'd3',
        title: 'Áp lực gia đình vs Đam mê',
        scenario: 'Gia đình muốn bạn theo ngành Kinh tế để dễ xin việc, nhưng đam mê thật sự của bạn là Nghệ thuật. Đây là quyết định quan trọng ảnh hưởng đến tương lai.',
        philosophy: '🔄 Phủ định của Phủ định: Phủ định áp đặt để tìm con đường riêng',
        choices: [
            {
                label: 'Nghe theo gia đình',
                effects: { quantity: 3, knowledge: 4, creativity: -5, mentalHealth: -5 },
                consequence: 'Gia đình vui nhưng bạn cảm thấy thiếu động lực. Có thể sau này sẽ hối tiếc.'
            },
            {
                label: 'Theo đuổi đam mê riêng',
                effects: { creativity: 10, mentalHealth: 8, knowledge: 3 },
                consequence: 'Bạn hạnh phúc với lựa chọn nhưng gia đình thất vọng. Cần nỗ lực chứng minh quyết định đúng.'
            },
            {
                label: 'Kết hợp: ngành Kinh tế Sáng tạo',
                effects: { quantity: 6, knowledge: 5, creativity: 5, softSkills: 3 },
                consequence: 'Tìm được con đường dung hòa - phủ định biện chứng. Vừa thỏa mãn gia đình vừa theo đuổi sáng tạo.'
            }
        ]
    },
    {
        id: 'd4',
        title: 'Nghỉ ngơi hay Deadline?',
        scenario: 'Bạn đang làm dự án quan trọng, deadline vào ngày mai nhưng đã thức 2 đêm liên tiếp. Cơ thể mệt mỏi nhưng chưa hoàn thành xong.',
        philosophy: '⚡ Quy luật Lượng-Chất: Lượng thời gian ≠ Chất lượng công việc',
        choices: [
            {
                label: 'Thức tiếp để hoàn thành',
                effects: { quantity: 8, knowledge: 3, mentalHealth: -8 },
                consequence: 'Dự án xong nhưng tinh thần kiệt sức. Vi phạm quy luật cân bằng - không bền vững.'
            },
            {
                label: 'Ngủ để lấy lại sức',
                effects: { mentalHealth: 10, quantity: -5, softSkills: -3 },
                consequence: 'Tinh thần phục hồi nhưng dự án chưa xong. Có thể gặp hậu quả về tiến độ.'
            },
            {
                label: 'Ngủ 3-4 giờ, dậy sớm làm',
                effects: { quantity: 5, mentalHealth: 4, creativity: 4 },
                consequence: 'Cân bằng hợp lý - nghỉ ngắn để phục hồi tỉnh táo, làm việc hiệu quả hơn.'
            }
        ]
    },
    {
        id: 'd5',
        title: 'Giúp người khác vs Tự phát triển',
        scenario: 'Bạn cùng lớp nhờ giúp ôn tập cả tuần vì sắp thi lại. Nhưng bạn cũng cần thời gian học môn mới và tham gia dự án quan trọng.',
        philosophy: '🤝 Bản chất con người: Phát triển cá nhân trong mối quan hệ xã hội',
        choices: [
            {
                label: 'Giúp bạn toàn thời gian',
                effects: { softSkills: 8, mentalHealth: 5, knowledge: -4, creativity: -3 },
                consequence: 'Bạn được ấm lòng nhưng ảnh hưởng đến tiến độ cá nhân. Cần cân bằng.'
            },
            {
                label: 'Từ chối, tự lo việc mình',
                effects: { knowledge: 8, creativity: 6, quantity: 4, softSkills: -5, mentalHealth: -3 },
                consequence: 'Bạn tiến bộ tốt nhưng cảm giác ích kỷ. Bạn ấy vẫn gặp khó khăn.'
            },
            {
                label: 'Giúp 1-2 giờ/ngày, focus chính',
                effects: { quantity: 5, knowledge: 4, softSkills: 4, mentalHealth: 4 },
                consequence: 'Vừa giúp bạn vừa phát triển - thể hiện tính xã hội nhưng không quên trách nhiệm bản thân.'
            }
        ]
    },
    {
        id: 'd6',
        title: 'CLB hay Tập trung học?',
        scenario: 'CLB sinh viên mời bạn vào Ban Chủ nhiệm - cơ hội tốt cho kỹ năng lãnh đạo nhưng sẽ tốn nhiều thời gian. Học kỳ này có nhiều môn khó.',
        philosophy: '🎯 Phát triển toàn diện: Tri thức + Kỹ năng mềm',
        choices: [
            {
                label: 'Tham gia BCN CLB',
                effects: { quantity: 3, softSkills: 10, mentalHealth: 5, knowledge: -5 },
                consequence: 'Kỹ năng lãnh đạo phát triển mạnh nhưng học tập bị ảnh hưởng. Cân nhắc ưu tiên.'
            },
            {
                label: 'Từ chối, focus học',
                effects: { knowledge: 9, creativity: 5, quantity: 5, softSkills: -4 },
                consequence: 'Học tập tốt nhưng bỏ lỡ cơ hội phát triển kỹ năng mềm quý giá.'
            },
            {
                label: 'Tham gia vị trí Member',
                effects: { quantity: 5, knowledge: 3, softSkills: 6, mentalHealth: 4 },
                consequence: 'Tham gia CLB nhưng không quá áp lực - cân bằng học tập và hoạt động.'
            }
        ]
    },
    {
        id: 'd7',
        title: 'Yêu đương hay Sự nghiệp?',
        scenario: 'Bạn đang hẹn hò nhưng người yêu phàn nàn bạn dành quá nhiều thời gian cho học tập và dự án. Mối quan hệ đang căng thẳng.',
        philosophy: '💔 Mâu thuẫn: Tình cảm vs Phát triển cá nhân',
        choices: [
            {
                label: 'Dành nhiều thời gian cho người yêu',
                effects: { mentalHealth: 8, softSkills: 3, knowledge: -5, quantity: -4 },
                consequence: 'Mối quan hệ cải thiện nhưng học tập, sự nghiệp bị chậm lại.'
            },
            {
                label: 'Giữ nguyên, focus sự nghiệp',
                effects: { knowledge: 8, quantity: 6, creativity: 4, mentalHealth: -6 },
                consequence: 'Phát triển tốt nhưng có thể mất mối quan hệ. Cần suy nghĩ thấu đáo.'
            },
            {
                label: 'Thuyết phục cân bằng cả hai',
                effects: { quantity: 4, knowledge: 4, mentalHealth: 5, softSkills: 4 },
                consequence: 'Giao tiếp để cùng nhau hiểu và cân bằng - giải pháp trưởng thành.'
            }
        ]
    },
    {
        id: 'd8',
        title: 'Đọc sách hay Thực hành?',
        scenario: 'Bạn học lập trình. Có người khuyên "đọc nhiều sách về thuật toán", người khác bảo "code thật nhiều project". Bạn chỉ có thời gian limited.',
        philosophy: '📚 Lý luận và Thực tiễn: Thống nhất biện chứng',
        choices: [
            {
                label: 'Focus đọc sách, lý thuyết',
                effects: { knowledge: 10, creativity: 3, quantity: 3, softSkills: -3 },
                consequence: 'Hiểu sâu lý thuyết nhưng thiếu kinh nghiệm thực tế. Cần thực hành sau.'
            },
            {
                label: 'Code project thực tế',
                effects: { quantity: 8, creativity: 8, knowledge: -3, softSkills: 3 },
                consequence: 'Kỹ năng thực hành tốt nhưng có thể thiếu nền tảng lý thuyết vững.'
            },
            {
                label: 'Kết hợp: học lý thuyết + code demo',
                effects: { quantity: 6, knowledge: 6, creativity: 6, softSkills: 3 },
                consequence: 'Thống nhất lý luận - thực tiễn. Vừa hiểu sâu vừa áp dụng được - tốt nhất!'
            }
        ]
    },
    {
        id: 'd9',
        title: 'Hoàn hảo hay Hoàn thành?',
        scenario: 'Dự án của bạn đã làm được 80%, còn 2 ngày nộp. Bạn có thể hoàn thành đủ yêu cầu HOẶC dành thời gian làm thêm features hoàn hảo nhưng rủi ro deadline.',
        philosophy: '⚖️ Lượng-Chất: Chất lượng đủ tốt vs Hoàn hảo không kịp',
        choices: [
            {
                label: 'Làm thêm features hoàn hảo',
                effects: { creativity: 10, knowledge: 5, mentalHealth: -8 },
                consequence: 'Kết quả xuất sắc nhưng có thể trễ deadline, gây stress cao. Rủi ro!'
            },
            {
                label: 'Hoàn thành đủ yêu cầu',
                effects: { quantity: 6, mentalHealth: 5, creativity: -3, knowledge: 3 },
                consequence: 'An toàn, đúng hạn nhưng không nổi bật. Đôi khi "đủ tốt" là hợp lý.'
            },
            {
                label: 'Hoàn thiện 1-2 tính năng quan trọng',
                effects: { quantity: 5, creativity: 6, knowledge: 4, mentalHealth: 3 },
                consequence: 'Focus vào điểm mấu chốt - cân bằng chất lượng và deadline hợp lý.'
            }
        ]
    },
    {
        id: 'd10',
        title: 'Cạnh tranh hay Hợp tác?',
        scenario: 'Trong nhóm, một bạn giỏi hơn bạn đề xuất cùng làm phần khó. Bạn có thể nhận phần dễ để đảm bảo điểm CAO hoặc hợp tác để HỌC THÊM.',
        philosophy: '🤝 Phát triển: Cạnh tranh lành mạnh + Hợp tác cùng tiến bộ',
        choices: [
            {
                label: 'Làm phần dễ, đảm bảo điểm',
                effects: { quantity: 5, knowledge: 3, creativity: -3, softSkills: -4 },
                consequence: 'Điểm tốt nhưng bỏ lỡ cơ hội học hỏi. Không phát triển kỹ năng mới.'
            },
            {
                label: 'Cùng làm phần khó',
                effects: { knowledge: 9, creativity: 8, softSkills: 6, quantity: 4, mentalHealth: -3 },
                consequence: 'Học được nhiều, phát triển tư duy nhưng vất vả hơn. Đầu tư dài hạn!'
            },
            {
                label: 'Phân chia hợp lý theo năng lực',
                effects: { quantity: 6, knowledge: 5, softSkills: 5, creativity: 4 },
                consequence: 'Mỗi người phát huy thế mạnh nhưng vẫn hỗ trợ nhau - cân bằng tốt.'
            }
        ]
    },
    {
        id: 'd11',
        title: 'Mệt mỏi hay Thành tích?',
        scenario: 'Bạn bị căng thẳng và mệt mỏi nhưng tuần này có 2 bài tập lớn và 1 presentation quan trọng. Nghỉ ngơi HOẶC gắng hoàn thành?',
        philosophy: '⚕️ Tinh thần: Sức khỏe là nền tảng',
        choices: [
            {
                label: 'Gắng gượng hoàn thành hết',
                effects: { quantity: 8, knowledge: 3, mentalHealth: -10 },
                consequence: 'Hoàn thành công việc nhưng tinh thần kiệt sức, có thể stress nặng sau.'
            },
            {
                label: 'Nghỉ ngơi hoàn toàn',
                effects: { mentalHealth: 13, quantity: -8, softSkills: -4 },
                consequence: 'Tinh thần phục hồi nhưng mất điểm, deadline trễ. Cần cân nhắc.'
            },
            {
                label: 'Làm quan trọng nhất, nghỉ sau',
                effects: { quantity: 4, mentalHealth: 4, softSkills: 3 },
                consequence: 'Ưu tiên hợp lý - làm việc cần thiết, bảo vệ tinh thần cơ bản.'
            }
        ]
    },
    {
        id: 'd12',
        title: 'Comfort Zone hay Thử thách?',
        scenario: 'Có cơ hội thực tập ở startup công nghệ mới - lương thấp, áp lực cao nhưng học được nhiều. Hoặc chọn công ty ổn định, thoải mái nhưng ít thử thách.',
        philosophy: '🚀 Phủ định của Phủ định: Phá vỡ để phát triển',
        choices: [
            {
                label: 'Startup - Thử thách cao',
                effects: { quantity: 8, knowledge: 10, creativity: 9, softSkills: 8, mentalHealth: -5 },
                consequence: 'Phát triển nhanh, học nhiều nhưng áp lực, vất vả. Đầu tư dài hạn!'
            },
            {
                label: 'Công ty ổn định',
                effects: { quantity: 4, mentalHealth: 8, creativity: -3, knowledge: 3 },
                consequence: 'Thoải mái, cân bằng nhưng phát triển chậm hơn. An toàn ngắn hạn.'
            },
            {
                label: 'Startup nhưng part-time trước',
                effects: { quantity: 6, knowledge: 8, creativity: 6, softSkills: 5, mentalHealth: 3 },
                consequence: 'Thử nghiệm trước khi cam kết - chiến lược thông minh!'
            }
        ]
    },
    {
        id: 'd13',
        title: 'Trung thực hay Điểm cao?',
        scenario: 'Trong bài thi, bạn ngồi cạnh bạn giỏi. Có cơ hội nhìn bài để chắc chắn điểm cao HOẶC tự làm, trung thực nhưng có thể sai.',
        philosophy: '⚖️ Đạo đức và Lợi ích: Giá trị bản thân',
        choices: [
            {
                label: 'Nhìn bài để chắc điểm',
                effects: { quantity: 5, knowledge: -5, creativity: -5, mentalHealth: -8 },
                consequence: 'Điểm cao nhưng không học được gì, tự tin giả tạo. Vi phạm nguyên tắc.'
            },
            {
                label: 'Tự làm, trung thực',
                effects: { knowledge: 8, creativity: 5, mentalHealth: 8, quantity: 3, softSkills: 4 },
                consequence: 'Có thể điểm không cao nhưng học thật, tự tin thật. Giá trị lâu dài!'
            },
            {
                label: 'Focus tối đa vào bài',
                effects: { quantity: 4, knowledge: 6, creativity: 4, mentalHealth: 5 },
                consequence: 'Nỗ lực hết mình với kiến thức của mình - đúng đắn và tự hào.'
            }
        ]
    },
    {
        id: 'd14',
        title: 'Đam mê vs Thực tế?',
        scenario: 'Bạn yêu thích viết blog chia sẻ kiến thức nhưng chưa kiếm được tiền. Gia đình bảo "bỏ đi, không có tương lai". Bạn cảm thấy đây là passion thật sự.',
        philosophy: '🎨 Lý tưởng và Hiện thực: Kiên trì biện chứng',
        choices: [
            {
                label: 'Bỏ blog, nghe gia đình',
                effects: { quantity: 3, knowledge: 3, creativity: -8, mentalHealth: -6 },
                consequence: 'Gia đình vui nhưng bạn mất đi niềm đam mê. Có thể hối tiếc sau này.'
            },
            {
                label: 'Kiên trì theo đuổi blog',
                effects: { creativity: 10, knowledge: 8, mentalHealth: 5, quantity: 3 },
                consequence: 'Phát triển đam mê nhưng gia đình lo lắng. Cần chứng minh giá trị.'
            },
            {
                label: 'Blog + học skill kiếm tiền',
                effects: { quantity: 6, knowledge: 6, creativity: 8, softSkills: 4 },
                consequence: 'Vừa giữ đam mê vừa xây dựng kỹ năng kiếm sống - cân bằng thông minh!'
            }
        ]
    },
    {
        id: 'd15',
        title: 'Thời gian cho mọi người',
        scenario: 'Cuối tuần: Gia đình muốn gặp bạn NHƯNG nhóm bạn thân tổ chức sinh nhật bất ngờ cho bạn. Cả hai đều quan trọng, không thể dời lịch.',
        philosophy: '❤️ Mâu thuẫn quan hệ: Cân bằng xã hội',
        choices: [
            {
                label: 'Về thăm gia đình',
                effects: { mentalHealth: 10, softSkills: -5 },
                consequence: 'Gia đình ấm áp nhưng bạn bè hơi buồn. Thể hiện quan tâm gia đình.'
            },
            {
                label: 'Ở lại dự sinh nhật',
                effects: { softSkills: 10, mentalHealth: 8, creativity: 3 },
                consequence: 'Bạn bè vui vẻ nhưng gia đình hơi thất vọng. Cần giải thích sau.'
            },
            {
                label: 'Sáng gặp gia đình, tối dự tiệc',
                effects: { quantity: 4, softSkills: 6, mentalHealth: 5 },
                consequence: 'Vất vả nhưng cân bằng được cả hai - thể hiện trách nhiệm và tình cảm.'
            }
        ]
    }
];

// Export for use in game
if (typeof window !== 'undefined') {
    window.DILEMMA_SCENARIOS = DILEMMA_SCENARIOS;
}
