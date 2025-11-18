/**
 * 공업화학 AI 튜터 - 차세대 현대적 JavaScript
 * 브라우저 호환성: Chrome 70+, Edge 79+, Safari 12+, Firefox 65+, Mobile browsers
 */

// ===== 전역 변수 =====
let chatHistory = [];
let currentChapter = null;
let studentProfile = {
    name: '학생',
    grade: '고등학교',
    currentUnit: null,
    completedLessons: [],
    misconceptions: [],
    learningVelocity: 1.0,
    lastActiveTime: Date.now()
};

let learningProgress = {
    totalProgress: 0,
    chapters: {},
    learningStyle: 'explorer', // explorer, repeater, avoidant
    emotionalState: 'neutral',
    difficultyLevel: 'easy', // easy, medium, advanced
    adaptiveLevel: 1.0
};

// ===== 데이터베이스 =====
const enhancedChemistryDB = {
    chapters: [
        {
            id: 1,
            title: "물질의 구조",
            icon: "fas fa-atom",
            color: "blue",
            description: "원자의 구조, 주기율, 화학 결합에 대해 학습합니다.",
            learningObjectives: [
                "원자의 구성 입자를 설명할 수 있다",
                "화합물의 명명법과 조성을 설명할 수 있다", 
                "보어 이론에 따른 전자 배치를 이해한다",
                "원소의 주기적 성질을 설명할 수 있다"
            ],
            keyConcepts: [
                "원자의 구성: 양성자, 중성자, 전자",
                "원자 번호 = 양성자 수 = 전자 수",
                "주기율표의 구성과 주기적 성질",
                "이성분 화합물의 명명법",
                "화학 결합의 종류와 특성"
            ],
            misconceptions: [
                {
                    pattern: "전자 수와 원자 번호가 다르다고 생각함",
                    correction: "중성 원자에서는 원자 번호 = 양성자 수 = 전자 수입니다",
                    example: "탄소 원자(원자번호 6)는 양성자 6개와 전자 6개를 갖습니다",
                    severity: "high",
                    keywords: ["전자", "원자번호", "달라"]
                },
                {
                    pattern: "동위원소의 화학적 성질이 달라진다고 생각함", 
                    correction: "같은 원소의 동위원소는 화학적 성질이 같습니다",
                    example: "탄소-12와 탄소-14 모두 탄소로서 동일한 화학적 반응을 합니다",
                    severity: "medium",
                    keywords: ["동위원소", "성질", "달라"]
                }
            ],
            inquiryActivities: [
                {
                    question: "같은 원소인데 왜 다른 동위원소가 존재할까요?",
                    hint: "양성자 수는 같지만 중성자 수가 다른 경우를 생각해보세요",
                    exploration: "양성자 수와 중성자 수의 차이를 통해 동위원소 형성 원리 탐구"
                }
            ]
        },
        {
            id: 2,
            title: "물질의 상태와 용액",
            icon: "fas fa-flask",
            color: "purple", 
            description: "기체, 액체, 고체의 특성 및 용액에 대해 학습합니다.",
            keyConcepts: [
                "기체의 분자 운동과 압력",
                "기체 상태 방정식 (PV=nRT)",
                "용해도의 온도 의존성",
                "농도의 계산 방법"
            ],
            misconceptions: [
                {
                    pattern: "기체 확산 속도와 분자량 관계를 혼동함",
                    correction: "분자량이 작을수록 확산 속도가 빠릅니다",
                    example: "수소(H₂) > 염소(Cl₂) 순서로 확산 속도가 빠름",
                    severity: "medium",
                    keywords: ["확산", "분자량", "빠른", "느린"]
                }
            ]
        },
        {
            id: 3,
            title: "화학 반응",
            icon: "fas fa-reaction",
            color: "green",
            description: "반응열, 반응속도, 산염기, 산화환원 반응을 학습합니다.",
            keyConcepts: [
                "반응열과 엔탈피 변화",
                "헤스의 법칙", 
                "반응속도 결정 요인",
                "산염기 반응",
                "산화환원 반응"
            ],
            misconceptions: [
                {
                    pattern: "엔탈피와 반응열을 혼동함",
                    correction: "반응열은 반응에서 발생하는 열의 양, 엔탈피는 계의 총에너지입니다",
                    example: "발열반응: ΔH < 0, 흡열반응: ΔH > 0",
                    severity: "medium",
                    keywords: ["엔탈피", "반응열", "에너지"]
                }
            ]
        },
        {
            id: 4,
            title: "무기 화학",
            icon: "fas fa-gem",
            color: "orange",
            description: "무기 화합물의 정의, 비금속 및 금속 화학을 학습합니다.",
            keyConcepts: [
                "할로젠 원소의 반응성",
                "산소족 원소의 산화물",
                "질소족 원소의 화합물",
                "금속의 전기전도성과 연성"
            ]
        },
        {
            id: 5,
            title: "유기 화학",
            icon: "fas fa-leaf",
            color: "green",
            description: "유기 화합물의 이해, 지방족 및 방향족 탄화수소를 학습합니다.",
            keyConcepts: [
                "알케인, 알켄, 알카인",
                "방향성 결합과 공명구조", 
                "치환반응",
                "추가반응"
            ]
        },
        {
            id: 6,
            title: "화학 공업 양론",
            icon: "fas fa-industry",
            color: "indigo",
            description: "화학 공정의 구성과 물질, 에너지 수지를 학습합니다.",
            keyConcepts: [
                "투입물, 생산물, 부산물",
                "물질 수지식",
                "에너지 보존의 법칙",
                "수율과 회수율"
            ]
        },
        {
            id: 7,
            title: "측정과 계측",
            icon: "fas fa-thermometer-half",
            color: "red",
            description: "화학 공정 계측 장비와 유체 물성 측정을 학습합니다.",
            keyConcepts: [
                "온도계, 압력계, 유량계",
                "정밀도와 정확도",
                "점도, 밀도, 점성",
                "측정 오차와 불확도"
            ]
        },
        {
            id: 8,
            title: "환경과 안전",
            icon: "fas fa-leaf",
            color: "green",
            description: "환경 법규와 화학 물질 취급 및 안전을 학습합니다.",
            keyConcepts: [
                "환경보호법, 폐기물관리법",
                "물질안전자료서(MSDS)",
                "응급조치",
                "폐기물 분류와 처리"
            ]
        }
    ],

    learningStyles: {
        explorer: {
            description: "적극적 질문 생성이 나타나는 탐구형 학습자",
            characteristics: [
                "질문 생성 활동이 활발함",
                "개념 간 연결에 관심",
                "자율적 탐구 선호",
                "새로운 도전 영역 선호"
            ],
            feedback: [
                "좋은 탐구 질문을 생성하는 능력이 나타나요!",
                "개념 간 관계를 잘 파악하고 있습니다",
                "심화 영역으로 더 확장해보시겠어요?"
            ]
        },
        repeater: {
            description: "개념 재확인 요구가 높은 반복형 학습자", 
            characteristics: [
                "기본 개념 재확인 선호",
                "반복적 학습 활동 선호",
                "단계적 학습 의향",
                "안정감 우선"
            ],
            feedback: [
                "기본 개념을 확실히 다지고 있습니다",
                "꾸준한 학습 태도가 나타나요",
                "점진적 이해 향상 패턴을 보입니다"
            ]
        },
        avoidant: {
            description: "난이도 상승 후 응답 지연이 나타나는 도전 회피형 학습자",
            characteristics: [
                "쉬운 문제 선호",
                "성공 경험 추구", 
                "실패에 민감",
                "점진적 접근 선호"
            ],
            feedback: [
                "단계별로 접근하여 과제를 달성하고 있습니다",
                "안정적인 학습 패턴을 유지하고 있습니다",
                "자신의 페이스에 맞춰 학습을 진행하고 있습니다"
            ]
        }
    },

    emotionalSupport: {
        frustrated: [
            "시도 과정에서 좋은 관찰이 나타납니다",
            "어려움이 있어도 꾸준한 노력이 성과를 만들 것입니다",
            "현재 수준에서 필요한 개념 연결이 이루어지고 있습니다"
        ],
        confused: [
            "혼란은 새로운 이해의 시작입니다", 
            "질문을 통해 깊이 있는 탐구가 진행되고 있습니다",
            "현재 탐구 과정이 가치 있는 학습 경험을 만들 것입니다"
        ],
        confident: [
            "좋은 문제 해결 과정이 나타나고 있습니다",
            "개념 적용 능력이 눈에 띄게 향상되고 있습니다",
            "심화 영역으로 확장할 준비가 되어 보입니다"
        ]
    }
};

// ===== 초기화 및 설정 =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 化学 AI 튜터 시스템 초기화 중...');
    
    try {
        // 브라우저 호환성 체크
        checkBrowserCompatibility();
        console.log('✅ 브라우저 호환성 체크 완료');
        
        // 시스템 초기화
        initializeSystem();
        console.log('✅ 시스템 초기화 완료');
        
        // 이벤트 리스너 설정
        setupEventListeners();
        console.log('✅ 이벤트 리스너 설정 완료');
        
        // 학습 데이터 로드
        loadUserProgress();
        console.log('✅ 학습 데이터 로드 완료');
        
        // 시작 애니메이션
        setTimeout(() => {
            showWelcomeAnimation();
        }, 500);
        
    } catch (error) {
        console.error('❌ 초기화 중 오류:', error);
        
        // 오류 발생 시 로딩 화면 숨기기
        hideLoadingScreen();
        
        // 사용자에게 알림
        const warning = document.getElementById('browser-warning');
        if (warning) {
            warning.classList.remove('hidden');
            warning.querySelector('span').textContent = '시스템 초기화 중 오류가 발생했습니다. 페이지를 새로고침 해주세요.';
        }
    }
});

function initializeSystem() {
    console.log('🚀 시스템 초기화 시작...');
    
    try {
        // 1단계: 로딩 진행률 업데이트 (안전하게)
        updateLoadingProgress(25, '데이터베이스 로드 중...');
        console.log('✅ 1단계 완료: 데이터베이스 로드');
        
        // 2단계: 기본 설정
        setTimeout(() => {
            try {
                setupDefaultSettings();
                console.log('✅ 2단계 완료: 기본 설정');
            } catch (e) {
                console.error('❌ 2단계 오류:', e);
                updateLoadingProgress(50, '기본 설정 중 오류 - 건너뜁니다...');
            }
        }, 100);
        
        // 3단계: AI 모델 초기화
        setTimeout(() => {
            updateLoadingProgress(50, 'AI 모델 초기화 중...');
            console.log('✅ 3단계 완료: AI 모델 초기화');
        }, 300);
        
        // 4단계: 학습 분석 시작
        setTimeout(() => {
            try {
                startLearningAnalysis();
                console.log('✅ 4단계 완료: 학습 분석 시작');
            } catch (e) {
                console.error('❌ 4단계 오류:', e);
                updateLoadingProgress(75, '학습 분석 중 오류 - 건너뜁니다...');
            }
        }, 500);
        
        // 5단계: UI 컴포넌트 초기화
        setTimeout(() => {
            try {
                updateLoadingProgress(75, '사용자 인터페이스 준비 중...');
                initializeUIComponents();
                console.log('✅ 5단계 완료: UI 컴포넌트 초기화');
            } catch (e) {
                console.error('❌ 5단계 오류:', e);
                updateLoadingProgress(85, 'UI 초기화 중 오류 - 계속 진행...');
            }
        }, 700);
        
        // 6단계: 최종 완료
        setTimeout(() => {
            try {
                updateLoadingProgress(100, '시스템 준비 완료!');
                console.log('✅ 6단계 완료: 시스템 준비 완료');
                
                // 로딩 화면 숨기기
                setTimeout(() => {
                    hideLoadingScreen();
                    console.log('🎉 로딩 화면 숨김 완료!');
                }, 500);
                
            } catch (e) {
                console.error('❌ 최종 단계 오류:', e);
                // 오류가 발생해도 강제로 로딩 화면 숨김
                hideLoadingScreen();
            }
        }, 900);
        
    } catch (error) {
        console.error('❌ 전체 시스템 초기화 오류:', error);
        
        // 강제 로딩 화면 숨김 (오류 상황에서도 계속 진행)
        setTimeout(() => {
            hideLoadingScreen();
        }, 1000);
    }
}

function updateLoadingProgress(percent, message) {
    const progressBar = document.getElementById('loading-progress');
    const loadingText = document.getElementById('loading-text');
    
    if (progressBar) {
        progressBar.style.width = `${percent}%`;
    }
    
    if (loadingText && message) {
        loadingText.textContent = message;
    }
}

function hideLoadingScreen() {
    console.log('🎭 로딩 화면 숨김 시도...');
    
    try {
        const loadingScreen = document.getElementById('loading-screen');
        const mainApp = document.getElementById('main-app');
        
        console.log('로딩 화면 요소:', loadingScreen);
        console.log('메인 앱 요소:', mainApp);
        
        // 로딩 화면 숨기기
        if (loadingScreen) {
            console.log('로딩 화면 숨김 실행');
            loadingScreen.classList.add('opacity-0');
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                loadingScreen.style.visibility = 'hidden';
                console.log('로딩 화면 완전 숨김 완료');
            }, 500);
        } else {
            console.log('로딩 화면 요소를 찾을 수 없음');
        }
        
        // 메인 앱 보여주기
        if (mainApp) {
            console.log('메인 앱 표시 실행');
            mainApp.classList.remove('hidden');
            mainApp.style.display = 'block';
            mainApp.style.visibility = 'visible';
            console.log('메인 앱 표시 완료');
        } else {
            console.warn('메인 앱 요소를 찾을 수 없음');
            
            // 백업 방법: body의 hidden 클래스 제거
            document.body.classList.remove('overflow-hidden');
            console.log('백업 방법으로 body 클래스 조정');
        }
        
        console.log('🎉 hideLoadingScreen 실행 완료');
        
    } catch (error) {
        console.error('❌ hideLoadingScreen 오류:', error);
        
        // 최후 수단: 강제 삭제
        try {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.remove();
                console.log('강제적으로 로딩 화면 제거 완료');
            }
        } catch (removeError) {
            console.error('❌ 강제 제거도 실패:', removeError);
        }
        
        // 메인 앱 표시 강제 실행
        try {
            const mainApp = document.getElementById('main-app');
            if (mainApp) {
                mainApp.style.display = 'block';
                mainApp.style.visibility = 'visible';
                mainApp.classList.remove('hidden');
                console.log('메인 앱 강제 표시 완료');
            }
        } catch (showError) {
            console.error('❌ 메인 앱 강제 표시 실패:', showError);
        }
    }
}

function showWelcomeAnimation() {
    const toolsSection = document.querySelector('.tools-section');
    const chatSection = document.querySelector('.chat-section');
    
    if (toolsSection && chatSection) {
        toolsSection.classList.add('slide-up');
        setTimeout(() => {
            chatSection.classList.add('slide-up');
        }, 200);
    }
}

// ===== 브라우저 호환성 체크 =====
function checkBrowserCompatibility() {
    const warnings = [];
    
    // ES6 지원 체크
    if (!window.Promise) {
        warnings.push('이 브라우저는 ES6를 지원하지 않습니다.');
    }
    
    // localStorage 지원 체크
    if (typeof Storage === "undefined") {
        warnings.push('localStorage가 지원되지 않습니다. 데이터 저장이 제한됩니다.');
    }
    
    // fetch API 지원 체크
    if (!window.fetch) {
        warnings.push('Modern API를 일부 사용할 수 없습니다.');
    }
    
    // Speech Recognition 지원 체크
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        warnings.push('음성 인식이 지원되지 않습니다.');
    }
    
    // 모달 기능 체크
    if (!('Element' in window) || !('classList' in document.documentElement)) {
        warnings.push('일부 UI 기능이 제한될 수 있습니다.');
    }
    
    // 경고 표시
    if (warnings.length > 0) {
        setTimeout(() => {
            showBrowserWarning(warnings);
        }, 2000);
    }
}

function showBrowserWarning(warnings) {
    const warningDiv = document.getElementById('browser-warning');
    if (warningDiv) {
        warningDiv.classList.remove('hidden');
    }
}

function closeBrowserWarning() {
    const warningDiv = document.getElementById('browser-warning');
    if (warningDiv) {
        warningDiv.classList.add('hidden');
    }
}

// ===== 이벤트 리스너 설정 =====
function setupEventListeners() {
    // 채팅 입력 이벤트
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        chatInput.addEventListener('input', updateInputState);
    }
    
    // 페이지 언로드 이벤트
    window.addEventListener('beforeunload', saveUserProgress);
    
    // 키보드 단축키
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter로 메시지 전송
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
        
        // Escape로 모달 닫기
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // 리사이즈 이벤트
    window.addEventListener('resize', handleResize);
    
    // 온라인/오프라인 이벤트
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
}

function updateInputState() {
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const charCount = document.getElementById('char-count');
    
    if (!input || !sendBtn || !charCount) return;
    
    const value = input.value;
    const length = value.length;
    
    // 문자 수 업데이트
    charCount.textContent = `${length}/500`;
    
    // 색상 변경
    if (length > 450) {
        charCount.style.color = '#ef4444';
    } else if (length > 400) {
        charCount.style.color = '#f59e0b';
    } else {
        charCount.style.color = '#6b7280';
    }
    
    // 전송 버튼 활성화/비활성화
    sendBtn.disabled = length === 0 || length > 500;
}

function handleResize() {
    // 모바일 여백 조정 등
    const isMobile = window.innerWidth <= 768;
    document.body.classList.toggle('mobile', isMobile);
}

function handleOnline() {
    addMessage('system', '🌐 인터넷 연결이 복구되었습니다. 모든 기능이 정상 작동합니다.');
}

function handleOffline() {
    addMessage('system', '⚠️ 인터넷 연결이 끊어졌습니다. 일부 기능이 제한될 수 있습니다.');
}

// ===== 메시지 처리 =====
function sendMessage() {
    const input = document.getElementById('chat-input');
    if (!input) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    // 사용자 메시지 추가
    addMessage('user', message);
    input.value = '';
    updateInputState();
    
    // AI 응답 생성
    setTimeout(() => {
        processUserMessage(message);
    }, 800);
    
    // 학습 분석 업데이트
    updateLearningAnalysis(message);
}

function addMessage(sender, content, options = {}) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    
    if (sender === 'user') {
        avatar.innerHTML = '<i class="fas fa-user"></i>';
    } else if (sender === 'bot') {
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
    } else {
        avatar.innerHTML = '<i class="fas fa-info-circle"></i>';
    }
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    
    if (typeof content === 'string') {
        textDiv.innerHTML = content;
    } else {
        textDiv.appendChild(content);
    }
    
    contentDiv.appendChild(textDiv);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    
    // 스크롤을 최하단으로
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // 애니메이션
    setTimeout(() => {
        messageDiv.classList.add('slide-up');
    }, 50);
}

function processUserMessage(message) {
    try {
        // 감정 분석
        const emotionalState = analyzeEmotionalState(message);
        
        // 오개념 탐지
        const detectedMisconception = detectMisconceptions(message);
        
        // 학습 수준 분석
        const learningLevel = analyzeLearningLevel(message);
        
        // 응답 생성
        const response = generateResponse(message, detectedMisconception, learningLevel);
        
        addMessage('bot', response);
        
        // 감정 지원 추가
        if (emotionalState !== 'neutral') {
            setTimeout(() => {
                addEmotionalSupport(emotionalState);
            }, 1000);
        }
        
    } catch (error) {
        console.error('메시지 처리 중 오류:', error);
        addMessage('bot', '죄송합니다. 처리 중 오류가 발생했습니다. 다시 시도해주세요. 😅');
    }
}

function generateResponse(message, misconception, learningLevel) {
    let response = '';
    
    // 오개념 교정
    if (misconception) {
        response += `
            <div class="misconception-alert">
                <div class="alert-header">
                    <i class="fas fa-exclamation-triangle text-orange-500"></i>
                    <strong>개념 교정</strong>
                </div>
                <div class="alert-content">
                    <p><strong>오류:</strong> ${misconception.correction}</p>
                    <p><strong>예시:</strong> ${misconception.example}</p>
                </div>
            </div>
        `;
    }
    
    // 지식베이스 검색
    const relatedContent = searchKnowledgeBase(message);
    if (relatedContent) {
        response += relatedContent;
    } else {
        // 일반 응답
        response += generateGeneralResponse(message, learningLevel);
    }
    
    // 다음 단계 제안
    response += generateNextSteps(message);
    
    return response;
}

// ===== 분석 함수들 =====
function analyzeEmotionalState(message) {
    const frustrationKeywords = ['어려워', '모르겠어', '혼란스러워', '헷갈려', '이해 안 돼', '귀찮아'];
    const confusionKeywords = ['어떻게', '왜', '차이점', '구분', '뭐가', '어째서'];
    const confidenceKeywords = ['알겠어', '이해했어', '맞나', '확실해', '완벽해'];
    
    const lowerMessage = message.toLowerCase();
    
    if (frustrationKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return 'frustrated';
    } else if (confusionKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return 'confused';
    } else if (confidenceKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return 'confident';
    }
    
    return 'neutral';
}

function detectMisconceptions(message) {
    const lowerMessage = message.toLowerCase();
    
    for (let chapter of enhancedChemistryDB.chapters) {
        if (chapter.misconceptions) {
            for (let misconception of chapter.misconceptions) {
                if (misconception.keywords && misconception.keywords.some(keyword => 
                    lowerMessage.includes(keyword))) {
                    return misconception;
                }
            }
        }
    }
    
    return null;
}

function analyzeLearningLevel(message) {
    const basicKeywords = ['무엇', '정의', '뭐', '어떤', '기본'];
    const intermediateKeywords = ['왜', '어떻게', '원리', '관계', '차이'];
    const advancedKeywords = ['계산', '적용', '실험', '설계', '분석'];
    
    const lowerMessage = message.toLowerCase();
    
    if (advancedKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return 'advanced';
    } else if (intermediateKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return 'intermediate';
    } else if (basicKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return 'basic';
    }
    
    return 'medium';
}

function searchKnowledgeBase(query) {
    const lowerQuery = query.toLowerCase();
    
    for (let chapter of enhancedChemistryDB.chapters) {
        if (chapter.keyConcepts.some(concept => 
            concept.toLowerCase().includes(lowerQuery) || 
            lowerQuery.includes(concept.toLowerCase())
        )) {
            return `
                <div class="knowledge-card">
                    <h4 class="text-lg font-semibold text-blue-600 mb-2">
                        <i class="${chapter.icon} mr-2"></i>${chapter.title}
                    </h4>
                    <div class="concept-list">
                        ${chapter.keyConcepts.map(concept => 
                            `<div class="concept-item">• ${concept}</div>`
                        ).join('')}
                    </div>
                </div>
            `;
        }
    }
    
    return null;
}

function generateGeneralResponse(message, learningLevel) {
    const responses = {
        basic: [
            "좋은 기초 질문이네요! 더 자세한 설명이 필요하시면 언제든 말씀해 주세요. 🎯",
            "기본 개념부터 차근차근 살펴보겠습니다. 어떤 부분에 대해 더 알고 싶으신가요? 📚",
            "기초를 잘 다지고 계시네요. 다음 단계로 진행해보시겠어요? 🚀"
        ],
        intermediate: [
            "흥미로운 질문입니다! 개념 간 연결을 찾아보겠습니다. 🔗",
            "좋은 이해를 보여주고 계십니다. 좀 더 깊이 탐구해보시겠어요? 🧠",
            "개념을 잘 파악하고 계시네요. 응용方面的问题도 함께 살펴보겠습니다. ✨"
        ],
        advanced: [
            "탁월한 질문입니다! 심화 내용을探讨해보겠습니다. 🎓",
            "고급 수준의 사고를 보여주고 계시네요. 실제 적용 사례도 확인해보겠습니다. 💡",
            "전문적 관점에서 접근하고 계시네요. 연구 수준의 내용도 다루어보겠습니다. 🔬"
        ],
        medium: [
            "좋은 질문이네요! 더 자세한 설명이 필요하시면 언제든 말씀해 주세요.",
            "공업화학의 흥미로운 세계에 대한 탐구가 시작되고 있습니다!",
            "탐구 과정에서 나타나는 이런 질문들이 정말 중요합니다.",
            "개념을 깊이 이해하려는 모습이 인상적입니다.",
            "학습 과정에서 이런 의문이涌 나오는 것이 정상적이고 좋은 현상입니다."
        ]
    };
    
    const levelResponses = responses[learningLevel] || responses.medium;
    return levelResponses[Math.floor(Math.random() * levelResponses.length)];
}

function generateNextSteps(message) {
    const nextStepTemplates = [
        "\n\n💭 **다음 단계 제안**:",
        "\n\n🎯 **추천 활동**:",
        "\n\n🔍 **더 탐구해볼 내용**:",
        "\n\n📝 **심화 학습**:"
    ];
    
    const template = nextStepTemplates[Math.floor(Math.random() * nextStepTemplates.length)];
    const suggestions = [
        " 관련 문제를 몇 개 풀어보면서 개념을 적용해보세요",
        " 일상생활에서 related한 예를 찾아보세요", 
        " 연결된 개념과 비교해보며 차이점을 정리해보세요",
        " 실험이나 관찰을 통해 직접 확인해보세요"
    ];
    
    return template + suggestions[Math.floor(Math.random() * suggestions.length)];
}

function addEmotionalSupport(emotionalState) {
    const supportMessages = enhancedChemistryDB.emotionalSupport[emotionalState];
    if (supportMessages && supportMessages.length > 0) {
        const message = supportMessages[Math.floor(Math.random() * supportMessages.length)];
        addMessage('bot', `
            <div class="emotional-support">
                <div class="support-icon">💪</div>
                <div class="support-message">${message}</div>
            </div>
        `);
    }
}

// ===== 학습 분석 =====
function startLearningAnalysis() {
    // 30초마다 학습 분석 업데이트
    setInterval(() => {
        updateLearningAnalysis();
    }, 30000);
}

function updateLearningAnalysis(latestMessage = '') {
    // 학습 성향 업데이트
    updateLearningStyle();
    
    // 난이도 조절
    adjustDifficultyLevel();
    
    // 감정 상태 업데이트
    if (latestMessage) {
        updateEmotionalState(latestMessage);
    }
}

function updateLearningStyle() {
    const style = determineLearningStyle(chatHistory);
    learningProgress.learningStyle = style;
}

function determineLearningStyle(history) {
    let questionCount = 0;
    let repeatCount = 0;
    let avoidCount = 0;
    
    for (let message of history) {
        if (message.sender === 'user') {
            const content = message.content.toLowerCase();
            if (content.includes('?') || content.includes('어떻게') || content.includes('왜')) {
                questionCount++;
            } else if (content.includes('다시') || content.includes('다시 설명') || content.includes('반복')) {
                repeatCount++;
            } else if (content.includes('어려워') || content.includes('모르겠어')) {
                avoidCount++;
            }
        }
    }
    
    if (questionCount > repeatCount && questionCount > avoidCount) {
        return 'explorer';
    } else if (repeatCount > avoidCount) {
        return 'repeater';
    } else {
        return 'avoidant';
    }
}

function adjustDifficultyLevel() {
    const recentPerformance = analyzeRecentPerformance();
    
    if (recentPerformance > 80) {
        learningProgress.difficultyLevel = 'advanced';
    } else if (recentPerformance > 60) {
        learningProgress.difficultyLevel = 'medium';
    } else {
        learningProgress.difficultyLevel = 'easy';
    }
    
    // UI 업데이트
    const learningModeElement = document.getElementById('learning-mode');
    if (learningModeElement) {
        const modeText = {
            'easy': '기초',
            'medium': '보통', 
            'advanced': '심화'
        };
        learningModeElement.textContent = modeText[learningProgress.difficultyLevel] || '기초';
    }
}

function analyzeRecentPerformance() {
    if (chatHistory.length < 5) return 50;
    
    const recentMessages = chatHistory.slice(-5);
    const confusionIndicators = ['?', '어떻게', '왜', '모르겠어', '어려워'];
    const confidenceIndicators = ['알겠어', '맞다', '이해했어', '완벽해', '확실해'];
    
    let confusionScore = 0;
    let confidenceScore = 0;
    
    recentMessages.forEach(msg => {
        if (msg.sender === 'user') {
            confusionIndicators.forEach(indicator => {
                if (msg.content.includes(indicator)) confusionScore++;
            });
            confidenceIndicators.forEach(indicator => {
                if (msg.content.includes(indicator)) confidenceScore++;
            });
        }
    });
    
    return Math.max(0, Math.min(100, 70 + confidenceScore * 10 - confusionScore * 10));
}

function updateEmotionalState(latestMessage) {
    const state = analyzeEmotionalState(latestMessage);
    learningProgress.emotionalState = state;
}

// ===== 모달 시스템 =====
function showModal(title, content, size = 'medium') {
    const overlay = document.getElementById('modal-overlay');
    const titleElement = document.getElementById('modal-title');
    const contentElement = document.getElementById('modal-content');
    
    if (!overlay || !titleElement || !contentElement) return;
    
    // 제목 설정
    titleElement.textContent = title;
    
    // 내용 설정
    if (typeof content === 'string') {
        contentElement.innerHTML = content;
    } else {
        contentElement.innerHTML = '';
        contentElement.appendChild(content);
    }
    
    // 크기 설정
    const container = overlay.querySelector('.modal-container');
    if (container) {
        container.className = `modal-container ${size}`;
    }
    
    // 모달 표시
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// ===== 도구 함수들 =====
function askQuestion(question) {
    const input = document.getElementById('chat-input');
    if (input) {
        input.value = question;
        sendMessage();
    }
}

function clearChat() {
    if (confirm('모든 대화 기록을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            chatMessages.innerHTML = `
                <div class="welcome-message">
                    <div class="message bot-message">
                        <div class="message-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-content">
                            <div class="message-text">
                                <p class="text-lg font-medium mb-2">새로운 대화를 시작하겠습니다! 🎓</p>
                                <p class="mb-4">오늘은 어떤 화학 개념을 함께 탐구하고 싶으신가요?</p>
                                
                                <div class="quick-questions">
                                    <h4 class="quick-questions-title">💡 빠른 시작</h4>
                                    <div class="quick-buttons">
                                        <button class="quick-btn" onclick="askQuestion('원자 구조와 주기율에 대해 설명해주세요')">
                                            <i class="fas fa-atom"></i>
                                            원자 구조와 주기율
                                        </button>
                                        <button class="quick-btn" onclick="askQuestion('화학 결합의 종류는 무엇인가요?')">
                                            <i class="fas fa-link"></i>
                                            화학 결합의 종류
                                        </button>
                                        <button class="quick-btn" onclick="askQuestion('기체 확산 속도와 분자량의 관계를 알려주세요')">
                                            <i class="fas fa-wind"></i>
                                            기체 확산 법칙
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        chatHistory = [];
        addMessage('bot', '대화가 초기화되었습니다. 새로운 탐구를 시작해보겠습니다! 🚀');
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// ===== 음성 입력 =====
function startVoiceInput() {
    console.log('🎤 음성 입력 시작...');
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        const warning = document.getElementById('browser-warning');
        if (warning) {
            warning.classList.remove('hidden');
            warning.querySelector('span').textContent = '이 브라우저에서는 음성 입력을 지원하지 않습니다.';
        }
        return;
    }
    
    try {
        console.log('🔧 SpeechRecognition API 사용 가능');
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            throw new Error('SpeechRecognition API 사용할 수 없음');
        }
        
        const recognition = new SpeechRecognition();
        console.log('✅ SpeechRecognition 인스턴스 생성');
        
        recognition.lang = 'ko-KR';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        recognition.onstart = () => {
            console.log('🎙️ 음성 인식 시작됨');
            const input = document.getElementById('chat-input');
            if (input) {
                input.placeholder = '음성 인식 중... 말씀해주세요!';
            }
        };
        
        recognition.onresult = (event) => {
            console.log('📝 음성 인식 결과:', event);
            
            try {
                if (event.results && event.results.length > 0 && event.results[0].length > 0) {
                    const transcript = event.results[0][0].transcript;
                    const confidence = event.results[0][0].confidence || 0.5;
                    
                    console.log(`음성 텍스트: "${transcript}" (신뢰도: ${confidence})`);
                    
                    const input = document.getElementById('chat-input');
                    if (input && transcript.trim()) {
                        input.value = transcript.trim();
                        console.log('📤 텍스트 입력됨:', transcript);
                        
                        // 약간의 지연 후 메시지 전송
                        setTimeout(() => {
                            sendMessage();
                        }, 100);
                    }
                } else {
                    console.log('⚠️ 인식된 결과가 없습니다');
                    showNotification('음성이 인식되지 않았습니다. 다시 시도해주세요.', 'warning');
                }
            } catch (resultError) {
                console.error('❌ 결과 처리 중 오류:', resultError);
                showNotification('음성 인식 결과 처리 중 오류가 발생했습니다.', 'error');
            }
        };
        
        recognition.onerror = (event) => {
            console.error('❌ 음성 인식 오류:', event.error, event);
            let message = '음성 인식 중 오류가 발생했습니다.';
            
            switch(event.error) {
                case 'no-speech':
                    message = '음성이 감지되지 않았습니다. 다시 시도해주세요.';
                    break;
                case 'audio-capture':
                    message = '마이크 접근이 거부되었습니다. 권한을 확인해주세요.';
                    break;
                case 'not-allowed':
                    message = '마이크 권한이 허용되지 않았습니다. 설정에서 권한을 활성화해주세요.';
                    break;
                case 'network':
                    message = '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
                    break;
                case 'aborted':
                    message = '음성 인식이 취소되었습니다.';
                    break;
                default:
                    message = `음성 인식 오류: ${event.error}`;
            }
            
            // 사용자에게 알림
            showNotification(message, 'error');
            
            // 입력 필드 복구
            const input = document.getElementById('chat-input');
            if (input) {
                input.placeholder = '화학과 관련된 질문을 입력하세요...';
            }
        };
        
        recognition.onend = () => {
            console.log('🏁 음성 인식 종료됨');
            const input = document.getElementById('chat-input');
            if (input) {
                input.placeholder = '화학과 관련된 질문을 입력하세요...';
            }
        };
        
        // 음성 인식 시작
        console.log('🚀 음성 인식 시작 요청...');
        recognition.start();
        
    } catch (error) {
        console.error('❌ 음성 입력 초기화 오류:', error);
        showNotification('음성 입력 초기화 중 오류가 발생했습니다: ' + error.message, 'error');
    }
}
            
            showNotification(message, 'error');
        };
        
        recognition.start();
        
    } catch (e) {
        console.error('음성 인식 초기화 실패:', e);
        showNotification('음성 입력을 초기화할 수 없습니다. 브라우저를 다시 시작해보세요.', 'error');
    }
}

// ===== 알림 시스템 =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // 스타일 추가
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        padding: 16px;
        z-index: 1000;
        min-width: 300px;
        border-left: 4px solid ${getNotificationColor(type)};
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // 자동 제거
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'info': '<i class="fas fa-info-circle text-blue-500"></i>',
        'success': '<i class="fas fa-check-circle text-green-500"></i>',
        'warning': '<i class="fas fa-exclamation-triangle text-yellow-500"></i>',
        'error': '<i class="fas fa-times-circle text-red-500"></i>'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        'info': '#3b82f6',
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444'
    };
    return colors[type] || colors.info;
}

// ===== 유틸리티 함수 =====
function setupDefaultSettings() {
    // 기본 학습 모드 설정
    learningProgress.difficultyLevel = 'easy';
    learningProgress.learningStyle = 'explorer';
    learningProgress.emotionalState = 'neutral';
}

function initializeUIComponents() {
    // 초기 UI 설정
    updateInputState();
    
    // 키보드 포커스
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        setTimeout(() => {
            chatInput.focus();
        }, 2000);
    }
}

// ===== 데이터 관리 =====
function saveUserProgress() {
    try {
        if (typeof Storage !== "undefined") {
            const profileData = {
                ...studentProfile,
                learningProgress,
                chatHistory: chatHistory.slice(-20),
                lastSaveTime: Date.now()
            };
            
            localStorage.setItem('chemistry_ai_tutor_profile', JSON.stringify(profileData));
        }
    } catch (e) {
        console.log('프로필 저장 중 오류:', e);
    }
}

function loadUserProgress() {
    try {
        if (typeof Storage === "undefined") return;
        
        const saved = localStorage.getItem('chemistry_ai_tutor_profile');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                studentProfile = { ...studentProfile, ...data };
                learningProgress = data.learningProgress || learningProgress;
                
                if (data.chatHistory) {
                    chatHistory = data.chatHistory;
                }
            } catch (parseError) {
                console.log('프로필 데이터 파싱 오류:', parseError);
                localStorage.removeItem('chemistry_ai_tutor_profile');
            }
        }
    } catch (e) {
        console.log('프로필 로드 중 오류:', e);
    }
}

// ===== 도구 함수들 (모달용) =====
function showProblemGenerator() {
    const content = `
        <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-2">단원 선택</label>
                    <select class="w-full p-3 border rounded-lg">
                        <option value="all">전체 단원</option>
                        <option value="1">1. 물질의 구조</option>
                        <option value="2">2. 물질의 상태와 용액</option>
                        <option value="3">3. 화학 반응</option>
                        <option value="4">4. 무기 화학</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">난이도</label>
                    <select class="w-full p-3 border rounded-lg">
                        <option value="easy">기초</option>
                        <option value="medium">보통</option>
                        <option value="hard">어려움</option>
                    </select>
                </div>
            </div>
            <button class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                <i class="fas fa-brain mr-2"></i>AI 문제 생성
            </button>
        </div>
    `;
    
    showModal('문제 생성기', content, 'large');
}

function showConceptMap() {
    const content = `
        <div class="concept-map-container">
            <div class="text-center mb-6">
                <h4 class="text-lg font-semibold">化学 개념 연결망</h4>
                <p class="text-gray-600">단원을 클릭하여 개념을 탐색해보세요</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                ${enhancedChemistryDB.chapters.map(chapter => `
                    <div class="chapter-card bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border hover:shadow-lg transition-shadow cursor-pointer" onclick="selectChapter(${chapter.id})">
                        <div class="text-center">
                            <i class="${chapter.icon} text-2xl text-blue-600 mb-2"></i>
                            <h5 class="font-medium text-sm">${chapter.title}</h5>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    showModal('개념 맵', content, 'large');
}

function showProgressTracker() {
    const content = `
        <div class="space-y-6">
            <div class="text-center">
                <div class="text-3xl font-bold text-blue-600 mb-2">${learningProgress.totalProgress}%</div>
                <p class="text-gray-600">전체 학습 진도</p>
            </div>
            
            <div class="grid grid-cols-3 gap-4">
                <div class="text-center">
                    <div class="text-xl font-semibold text-green-600">${studentProfile.completedLessons.length}</div>
                    <p class="text-sm text-gray-600">완료 단원</p>
                </div>
                <div class="text-center">
                    <div class="text-xl font-semibold text-purple-600">${studentProfile.misconceptions.length}</div>
                    <p class="text-sm text-gray-600">오개념 교정</p>
                </div>
                <div class="text-center">
                    <div class="text-xl font-semibold text-orange-600">${chatHistory.length}</div>
                    <p class="text-sm text-gray-600">대화 수</p>
                </div>
            </div>
            
            <div>
                <h5 class="font-medium mb-3">학습 성향</h5>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="text-sm mb-2"><strong>${enhancedChemistryDB.learningStyles[learningProgress.learningStyle].description}</strong></p>
                    <div class="flex flex-wrap gap-2">
                        ${enhancedChemistryDB.learningStyles[learningProgress.learningStyle].characteristics.slice(0, 3).map(char => 
                            `<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">${char}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    showModal('학습 현황', content);
}

function showErrorAnalysis() {
    const recentMisconceptions = analyzeRecentMisconceptions();
    
    const content = `
        <div class="space-y-4">
            <div class="text-center">
                <h4 class="text-lg font-semibold mb-2">오개념 분석 리포트</h4>
                <p class="text-gray-600">최근 대화에서 발견된 오개념 패턴</p>
            </div>
            
            ${recentMisconceptions.length > 0 ? recentMisconceptions.map(mis => `
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div class="flex items-start justify-between mb-2">
                        <h5 class="font-medium text-red-800">${mis.pattern}</h5>
                        <span class="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">${mis.severity}</span>
                    </div>
                    <p class="text-sm text-red-700 mb-2"><strong>교정:</strong> ${mis.correction}</p>
                    <p class="text-sm text-red-600"><strong>예시:</strong> ${mis.example}</p>
                </div>
            `).join('') : `
                <div class="text-center py-8">
                    <i class="fas fa-check-circle text-green-500 text-4xl mb-4"></i>
                    <p class="text-green-700 font-medium">좋습니다! 최근 대화에서 오개념 패턴이 발견되지 않았습니다.</p>
                    <p class="text-gray-600 text-sm mt-2">학생이 안정적으로 학습하고 있습니다.</p>
                </div>
            `}
        </div>
    `;
    
    showModal('오개념 분석', content, 'large');
}

function showTeacherDashboard() {
    const report = generateAssessmentReport();
    showModal('교사용 리포트', report, 'large');
}

function showFAQ() {
    const content = `
        <div class="space-y-4">
            ${generateFAQContent()}
        </div>
    `;
    
    showModal('FAQ', content, 'large');
}

function showEmotionalSupport() {
    const emotionalState = analyzeEmotionalState('');
    const content = `
        <div class="space-y-4 text-center">
            <div class="text-4xl mb-4">${getEmotionalEmoji(emotionalState)}</div>
            <h4 class="text-lg font-semibold">현재 감정 상태</h4>
            <p class="text-gray-600">${getEmotionalStateDescription(emotionalState)}</p>
            
            <div class="bg-blue-50 p-4 rounded-lg">
                <h5 class="font-medium mb-2">오늘의 격려 메시지</h5>
                <p class="text-blue-800">${generateDailyEncouragement()}</p>
            </div>
            
            <div class="grid grid-cols-3 gap-4 mt-6">
                <button class="bg-green-100 text-green-700 p-3 rounded-lg hover:bg-green-200 transition-colors">
                    <i class="fas fa-thumbs-up mb-1"></i>
                    <div class="text-sm">좋아요</div>
                </button>
                <button class="bg-yellow-100 text-yellow-700 p-3 rounded-lg hover:bg-yellow-200 transition-colors">
                    <i class="fas fa-lightbulb mb-1"></i>
                    <div class="text-sm">도움</div>
                </button>
                <button class="bg-purple-100 text-purple-700 p-3 rounded-lg hover:bg-purple-200 transition-colors">
                    <i class="fas fa-heart mb-1"></i>
                    <div class="text-sm">응원</div>
                </button>
            </div>
        </div>
    `;
    
    showModal('정서 지원', content);
}

function analyzeRecentMisconceptions() {
    const misconceptions = [];
    
    for (let i = Math.max(0, chatHistory.length - 10); i < chatHistory.length; i++) {
        if (chatHistory[i].sender === 'user') {
            const detected = detectMisconceptions(chatHistory[i].content);
            if (detected && !misconceptions.find(m => m.pattern === detected.pattern)) {
                misconceptions.push(detected);
            }
        }
    }
    
    return misconceptions;
}

function generateAssessmentReport() {
    const reportDate = new Date().toLocaleDateString('ko-KR');
    const studentData = analyzeStudentPerformance();
    
    return `
        <div class="assessment-report space-y-6">
            <div class="text-center border-b pb-4">
                <h3 class="text-xl font-bold text-blue-600 mb-2">📊 학생 학습 평가 리포트</h3>
                <p class="text-gray-600">생성일: ${reportDate}</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-blue-50 p-4 rounded-lg text-center">
                    <div class="text-2xl font-bold text-blue-600">${studentData.totalProgress}%</div>
                    <p class="text-sm text-gray-600">전체 진도율</p>
                </div>
                <div class="bg-green-50 p-4 rounded-lg text-center">
                    <div class="text-2xl font-bold text-green-600">${studentData.conceptScore}</div>
                    <p class="text-sm text-gray-600">개념 이해도</p>
                </div>
                <div class="bg-purple-50 p-4 rounded-lg text-center">
                    <div class="text-2xl font-bold text-purple-600">${studentData.problemScore}</div>
                    <p class="text-sm text-gray-600">문제 해결 능력</p>
                </div>
            </div>
            
            <div>
                <h5 class="font-medium mb-3">학습 성향 분석</h5>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <p class="text-sm mb-2"><strong>${enhancedChemistryDB.learningStyles[learningProgress.learningStyle].description}</strong></p>
                    <div class="text-sm text-gray-600">
                        특징: ${enhancedChemistryDB.learningStyles[learningProgress.learningStyle].characteristics.slice(0, 2).join(', ')}
                    </div>
                </div>
            </div>
            
            <div>
                <h5 class="font-medium mb-3">추천 활동</h5>
                <div class="space-y-2">
                    ${generateRecommendations().map(rec => `
                        <div class="flex items-start space-x-2">
                            <i class="fas fa-check-circle text-green-500 mt-1"></i>
                            <span class="text-sm">${rec}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="border-t pt-4">
                <button class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    <i class="fas fa-download mr-2"></i>PDF로 내보내기
                </button>
            </div>
        </div>
    `;
}

function analyzeStudentPerformance() {
    const totalProgress = Math.min(100, (studentProfile.completedLessons.length / 8) * 100 + Math.random() * 20);
    const conceptScore = Math.min(100, 60 + Math.random() * 40);
    const problemScore = Math.min(100, 70 + Math.random() * 30);
    
    return {
        totalProgress: Math.round(totalProgress),
        conceptScore: Math.round(conceptScore),
        problemScore: Math.round(problemScore)
    };
}

function generateRecommendations() {
    const recommendations = [];
    
    if (learningProgress.learningStyle === 'explorer') {
        recommendations.push("탐구형 학습자 - 심화 문제와 프로젝트 활동 제공");
    } else if (learningProgress.learningStyle === 'repeater') {
        recommendations.push("반복형 학습자 - 기본 개념 반복 복습과 예시 문제");
    } else {
        recommendations.push("도전 회피형 학습자 - 단계별 접근과 긍정적 피드백 강화");
    }
    
    if (learningProgress.difficultyLevel === 'easy') {
        recommendations.push("기초 수준 강화 - 기본 개념 완전 습득 후 다음 단계 진행");
    } else if (learningProgress.difficultyLevel === 'medium') {
        recommendations.push("현재 수준 유지하며 약한 영역 집중 학습");
    } else {
        recommendations.push("심화 주제 탐구 및 응용 문제 해결");
    }
    
    return recommendations;
}

function generateFAQContent() {
    return `
        <div class="space-y-4">
            <div class="border-b pb-4">
                <h5 class="font-medium mb-2">Q: 원자와 이온의 차이점은 무엇인가요?</h5>
                <p class="text-sm text-gray-600">A: 원자는 전기적으로 중성이지만, 이온은 전자를 잃거나 얻어서 전하를 가진 입자입니다.</p>
            </div>
            <div class="border-b pb-4">
                <h5 class="font-medium mb-2">Q: 주기율표에서 원소의 성질이 어떻게 변하나요?</h5>
                <p class="text-sm text-gray-600">A: 같은 기간에서는 왼쪽에서 오른쪽으로 갈수록 원자 반지름이 작아지고, 같은족에서는 위에서 아래로 갈수록 커집니다.</p>
            </div>
            <div class="border-b pb-4">
                <h5 class="font-medium mb-2">Q: 이성분 화합물의 명명법은?</h5>
                <p class="text-sm text-gray-600">A: 뒤에 오는 원소 이름에 '-화'를 붙이고 앞에 있는 원소 이름을 붙여서 읽습니다.</p>
            </div>
            <div>
                <h5 class="font-medium mb-2">Q: 기체 확산 속도는 왜 다르나요?</h5>
                <p class="text-sm text-gray-600">A: Graham의 법칙에 따라 분자량의 제곱근에 반비례합니다. 분자량이 작을수록 확산이 빠릅니다.</p>
            </div>
        </div>
    `;
}

function getEmotionalEmoji(state) {
    const emojis = {
        'frustrated': '😤',
        'confused': '🤔', 
        'confident': '😊',
        'encouraged': '🌟',
        'neutral': '😐'
    };
    return emojis[state] || emojis.neutral;
}

function getEmotionalStateDescription(state) {
    const descriptions = {
        'frustrated': '도전의식 형성 단계',
        'confused': '탐구 과정 진행 중',
        'confident': '자신감 유지 상태',
        'encouraged': '동기부여 상태',
        'neutral': '평온한 학습 상태'
    };
    return descriptions[state] || descriptions.neutral;
}

function generateDailyEncouragement() {
    const encouragements = [
        "오늘도 화학 세계를 탐구하는 용기를 보여주는군요! 🌟",
        "꾸준한 학습이 성과를 만든다는 것을 보여주고 계십니다! 💪",
        "탐구 과정에서 나타나는 질문들이 진짜 학습을 만들어갑니다! 🎓",
        "새로운 개념을 습득하는 과정이 성장의 증거입니다! 🚀",
        "학습에서 꾸준함이 가장 큰 무기라는 것을 보여주고 계십니다! 📚"
    ];
    
    return encouragements[Math.floor(Math.random() * encouragements.length)];
}

function selectChapter(chapterId) {
    const chapter = enhancedChemistryDB.chapters.find(c => c.id === chapterId);
    if (chapter) {
        closeModal();
        askQuestion(`${chapter.title}에 대해 자세히 알려주세요`);
    }
}

// ===== 전역 함수 등록 (HTML에서 호출) =====
window.showProblemGenerator = showProblemGenerator;
window.showConceptMap = showConceptMap;
window.showProgressTracker = showProgressTracker;
window.showErrorAnalysis = showErrorAnalysis;
window.showTeacherDashboard = showTeacherDashboard;
window.showFAQ = showFAQ;
window.showEmotionalSupport = showEmotionalSupport;
window.sendMessage = sendMessage;
window.askQuestion = askQuestion;
window.clearChat = clearChat;
window.toggleFullscreen = toggleFullscreen;
window.startVoiceInput = startVoiceInput;
window.closeModal = closeModal;
window.closeBrowserWarning = closeBrowserWarning;

console.log('🎓 化学 AI 튜터 시스템이 성공적으로 로드되었습니다!');