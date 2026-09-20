import React, { useState, useEffect, useRef } from 'react';
import { Camera, Download, Image as ImageIcon, Wand2, RefreshCw, Layers, Sun, Zap, Type, Grid, Sliders, Palette, Maximize, Box, Upload, X, Shirt, Scissors, Watch, Dice5, Copy, Check, Stamp, Trash2, Heart, Users, History, Clock, RotateCcw, ChevronDown, ChevronUp, Plus } from 'lucide-react';

// --- Dữ liệu Từ Khóa (Giữ nguyên) ---
const KEYWORDS = {
  generalStyle: [
    { label: 'Chọn Phong cách chung', value: '' },
    { label: 'Futuristic Saigon (Sài Gòn Tương Lai)', value: 'Futuristic cyberpunk style, neon lights, high-tech' },
    { label: 'Editorial Style (Biên tập)', value: 'Editorial style' },
    { label: 'Street Style (Đường phố)', value: 'Street style' },
    { label: 'High Fashion (Thời trang cao cấp)', value: 'High fashion style' },
    { label: 'Cinematic (Điện ảnh)', value: 'Cinematic shot' },
    { label: 'Photojournalism (Báo chí)', value: 'Photojournalism' },
    { label: 'Travel Photography (Du lịch)', value: 'Travel photography' },
    { label: '3D Render', value: 'Unreal Engine 5 Render, 8k resolution' },
    { label: 'Anime Style', value: 'Anime style' },
  ],
  composition: [
    { label: 'Chọn Bố cục', value: '' },
    { label: 'Wide angle (Góc rộng - Toàn cảnh)', value: 'Wide angle shot, establishing shot' },
    { label: 'Low angle (Góc thấp)', value: 'Low angle shot' },
    { label: 'Eye level (Ngang mắt)', value: 'Eye level shot' },
    { label: 'Aerial view (Trên cao - Flycam)', value: 'Aerial drone view' },
    { label: 'Close up (Cận cảnh)', value: 'Close up shot' },
    { label: 'Medium shot (Trung bình)', value: 'Medium shot' },
    { label: 'Symmetrical (Đối xứng)', value: 'Symmetrical shot' },
  ],
  style: [
    { label: 'Chọn Phong cách (Medium)', value: '' },
    { label: 'Realistic Photo (Ảnh thực tế)', value: 'Hyper-realistic photography, 8k' },
    { label: 'Film Still (Cảnh phim)', value: 'Cinematic film still' },
    { label: 'Digital Art', value: 'Digital art masterpiece' },
    { label: 'Cyberpunk', value: 'Cyberpunk futuristic style' },
    { label: 'Watercolor (Màu nước)', value: 'Soft watercolor painting' },
  ],
  camera: [
    { label: 'Chọn Camera/Lens', value: '' },
    { label: 'Canon EOS R5', value: 'Canon EOS R5, 50mm lens' },
    { label: 'Sony A7R IV', value: 'Sony A7R IV' },
    { label: 'Drone Camera', value: 'DJI Mavic 3 Cine' },
    { label: 'Cinematic Lens', value: 'Anamorphic lens' },
    { label: 'Wide Angle', value: '16mm wide angle lens' },
    { label: 'Portrait Lens', value: '85mm f/1.2 lens' },
  ],
  subject: [
    { label: 'Chọn/Nhập Đối tượng', value: '' },
    { label: 'Saigon Gen Z 2025', value: 'Trendy Vietnamese Gen Z youth in 2025' },
    { label: 'Tech Cyclo Driver (Xích lô công nghệ)', value: 'A futuristic cyclo driver with robotic arm' },
    { label: 'Vietnamese Woman (Phụ nữ VN)', value: 'A beautiful Vietnamese woman' },
    { label: 'Couple (Cặp đôi)', value: 'A romantic couple' },
    { label: 'Cyberpunk Police', value: 'Futuristic police officer in armor' },
    { label: 'Street Vendor (Gánh hàng rong)', value: 'A futuristic street food vendor with holographic menu' },
    { label: 'Robot Citizen', value: 'A humanoid robot citizen' },
  ],
  subjectDesc: [
    { label: 'Mô tả Đối tượng', value: '' },
    { label: 'Modern & Stylish', value: 'stylish and modern appearance' },
    { label: 'Traditional mix Tech', value: 'blending traditional features with high-tech accessories' },
    { label: 'Detailed', value: 'highly detailed face and skin texture' },
    { label: 'Glowing', value: 'glowing with neon lights and cybernetics' },
    { label: 'Elegant', value: 'elegant and graceful pose' },
  ],
  clothing: [
    { label: 'Chọn Trang phục', value: '' },
    { label: 'Neo-Ao Dai (Áo Dài Cách Tân 2025)', value: 'wearing a futuristic modernized Ao Dai with LED patterns' },
    { label: 'Cyber Streetwear', value: 'wearing tech-wear street fashion' },
    { label: 'Traditional Ao Dai', value: 'wearing traditional silk Ao Dai' },
    { label: 'Smart Suit', value: 'wearing a sharp high-tech business suit' },
    { label: 'Casual Summer', value: 'wearing light and comfortable summer clothes' },
    { label: 'Matching Couple Outfits', value: 'wearing stylish matching couple outfits' },
  ],
  hairStyle: [
    { label: 'Chọn Kiểu tóc', value: '' },
    { label: 'Neon Highlights', value: 'black hair with neon blue highlights' },
    { label: 'Long Straight', value: 'long silky straight black hair' },
    { label: 'Short Modern Bob', value: 'chic short bob cut' },
    { label: 'Undercut', value: 'modern fade undercut' },
    { label: 'Traditional Bun', value: 'hair tied in a gentle traditional bun' },
  ],
  tattoos: [
    { label: 'Chọn Hình xăm', value: '' },
    { label: 'No Tattoo (Không hình xăm)', value: '' },
    { label: 'Full Sleeve Dragon (Rồng kín tay)', value: 'with an intricate full sleeve tattoo featuring a majestic asian dragon coiling around the arm' },
    { label: 'Full Back Tiger (Hổ kín lưng)', value: 'with a massive, fierce tiger tattoo covering the entire back in Japanese Irezumi style' },
    { label: 'Full Chest Wolf (Sói kín ngực)', value: 'with a bold wolf head tattoo centered on the chest with geometric patterns' },
    { label: 'Mandala Sleeves (Mandala 2 tay)', value: 'with detailed spiritual mandala patterns covering both arms' },
    { label: 'Phoenix Body (Phượng hoàng toàn thân)', value: 'with a colorful phoenix tattoo flowing across the shoulder and torso' },
    { label: 'Cybernetic Circuit (Mạch điện tử)', value: 'with glowing blue cybernetic circuit patterns tattooed on the skin like a cyborg' },
    { label: 'Minimalist Wrist (Cổ tay tối giản)', value: 'with small, delicate minimalist line art tattoos on the wrists' },
    { label: 'Koi Fish Leg (Cá chép chân)', value: 'with a vibrant lucky Koi fish tattoo swimming up the calf' },
    { label: 'Samurai Shoulder (Samurai vai)', value: 'with a warrior samurai tattoo depicted on the shoulder blade' },
  ],
  accessories: [
    { label: 'Chọn Phụ kiện', value: '' },
    { label: 'Smart Glasses (Kính thông minh)', value: 'wearing augmented reality smart glasses' },
    { label: 'Holographic Phone', value: 'using a transparent holographic smartphone' },
    { label: 'Digital Watch', value: 'wearing a holographic smart watch' },
    { label: 'Non La (Nón lá)', value: 'holding a traditional conical hat' },
    { label: 'Lotus Flower', value: 'holding a fresh pink lotus flower' },
    { label: 'Iced Coffee (Cà phê sữa đá)', value: 'holding a plastic cup of Vietnamese iced coffee' },
  ],
  environment: [
    { label: 'Chọn Bối cảnh', value: '' },
    { label: 'Saigon Skyline 2025 (Bitexco/Landmark)', value: 'futuristic Saigon skyline with Bitexco and Landmark 81, flying cars in background' },
    { label: 'Nguyen Hue Walking Street 2025', value: 'Nguyen Hue walking street at night with giant holographic billboards' },
    { label: 'Ben Thanh Market Future', value: 'modernized Ben Thanh Market with neon signs and glass roof' },
    { label: 'Metro Station (Ga tàu điện)', value: 'modern Ben Thanh underground metro station' },
    { label: 'Old French Quarter', value: 'classic French colonial architecture in District 1' },
    { label: 'Street Coffee (Cà phê bệt)', value: 'busy pavement coffee shop under green trees' },
    { label: 'Notre Dame Cathedral', value: 'Notre Dame Cathedral of Saigon' },
  ],
  envDesc: [
    { label: 'Mô tả Bối cảnh', value: '' },
    { label: 'Bustling & Futuristic', value: 'bustling with people and drones, futuristic vibe' },
    { label: 'Rainy Cyberpunk', value: 'raining heavily with neon reflections on wet asphalt' },
    { label: 'Sunny Morning', value: 'bright sunny morning with clear blue sky' },
    { label: 'Golden Hour', value: 'bathed in warm golden hour sunlight' },
    { label: 'Traffic Jam', value: 'crowded with motorbikes and futuristic vehicles' },
  ],
  lighting: [
    { label: 'Chọn Ánh sáng', value: '' },
    { label: 'Neon City Lights', value: 'vibrant neon city lights in pink and blue' },
    { label: 'Golden Hour', value: 'golden hour lighting' },
    { label: 'Natural Sunlight', value: 'soft natural sunlight' },
    { label: 'Cinematic', value: 'dramatic cinematic lighting' },
    { label: 'Rainy Night', value: 'atmospheric rainy night lighting' },
  ],
  atmosphere: [
    { label: 'Chọn Không khí/Cảm xúc', value: '' },
    { label: 'Dynamic & Energy', value: 'dynamic and full of energy' },
    { label: 'Nostalgic yet Modern', value: 'nostalgic yet modern atmosphere' },
    { label: 'Romantic', value: 'romantic and dreamy' },
    { label: 'Cyberpunk', value: 'high-tech cybernetic vibe' },
    { label: 'Peaceful', value: 'peaceful and serene' },
  ],
  ratios: [
    { label: '16:9 (Ngang)', value: '--ar 16:9' },
    { label: '1:1 (Vuông)', value: '--ar 1:1' },
    { label: '9:16 (Dọc)', value: '--ar 9:16' },
    { label: '21:9 (Điện ảnh)', value: '--ar 21:9' },
  ]
};

// --- Helper Functions ---
const base64ToBlob = (base64, mimeType = 'image/png') => {
  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
};

// --- Custom Select Component (MỚI: Hỗ trợ chọn thay thế & chọn thêm) ---
const CustomSelect = ({ label, icon, options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    // Thay thế giá trị cũ (Change without clear manually)
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleAppend = (e, optionValue) => {
    // Thêm giá trị mới vào sau giá trị cũ (Append)
    e.stopPropagation();
    const newValue = value ? `${value}, ${optionValue}` : optionValue;
    onChange(newValue);
    // Giữ dropdown mở để có thể chọn tiếp
  };

  return (
    <div className="mb-4 relative" ref={containerRef}>
      <label className="flex items-center text-sm font-medium text-gray-300 mb-1.5">
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      <div className="relative">
        <input
          type="text"
          className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 placeholder-gray-500 pr-10"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onClick={() => setIsOpen(true)} // Click vào ô input sẽ mở dropdown
        />
        {/* Nút Toggle Dropdown */}
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Danh sách Dropdown Tùy chỉnh */}
      {isOpen && (
        <div className="absolute z-50 w-full bg-slate-800 border border-slate-700 rounded-lg shadow-xl mt-1 max-h-60 overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-100">
          {options.map((opt, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between px-3 py-2 hover:bg-slate-700 cursor-pointer group ${opt.value === '' ? 'text-slate-500 italic' : 'text-gray-200'}`}
              onClick={() => handleSelect(opt.value)}
            >
              <span className="text-sm truncate flex-1">{opt.label}</span>
              
              {/* Nút Cộng dồn (Append) - Chỉ hiện khi có giá trị */}
              {opt.value && (
                <button
                  className="p-1.5 text-slate-500 hover:text-green-400 hover:bg-slate-600 rounded opacity-0 group-hover:opacity-100 transition-all ml-2"
                  title="Thêm vào (không xóa cũ)"
                  onClick={(e) => handleAppend(e, opt.value)}
                >
                  <Plus size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Component Chính ---
export default function App() {
  const defaultParams = {
    generalStyle: 'Futuristic cyberpunk style, neon lights, high-tech',
    composition: 'Wide angle shot, establishing shot',
    style: 'Realistic Photo',
    camera: 'Canon EOS R5, 50mm lens',
    subject: 'Saigon Gen Z 2025',
    subjectDesc: 'Modern & Stylish',
    clothing: 'Neo-Ao Dai (Áo Dài Cách Tân 2025)',
    hairStyle: 'Neon Highlights',
    tattoos: '',
    accessories: 'Smart Glasses (Kính thông minh)',
    environment: 'Saigon Skyline 2025 (Bitexco/Landmark)',
    envDesc: 'Bustling & Futuristic',
    lighting: 'Neon City Lights',
    atmosphere: 'Dynamic & Energy',
    ratio: '--ar 16:9'
  };

  const [params, setParams] = useState(defaultParams);
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isCouple, setIsCouple] = useState(false);
  
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('create');
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'create') {
      buildPrompt();
    }
  }, [params, uploadedImage, isCouple, activeTab]);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('promptHistory_v1');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.warn("Could not load history", e);
    }
  }, []);

  useEffect(() => {
    try {
      const historyToSave = history.slice(0, 20).map(item => {
        const { image, ...rest } = item; 
        return rest; 
      });
      localStorage.setItem('promptHistory_v1', JSON.stringify(historyToSave));
    } catch (e) {
      console.warn("Could not save history to localStorage", e);
    }
  }, [history]);

  const handleParamChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const handleCopyPrompt = (textToCopy) => {
    const text = textToCopy || prompt;
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error('Lỗi khi copy prompt:', err);
    }
    document.body.removeChild(textArea);
  };

  const clearAll = () => {
    const emptyParams = {
      generalStyle: '', composition: '', style: '', camera: '', subject: '', subjectDesc: '',
      clothing: '', hairStyle: '', tattoos: '', accessories: '', environment: '', envDesc: '',
      lighting: '', atmosphere: '', ratio: '' 
    };
    setParams(emptyParams); 
    setIsCouple(false);
    setPrompt('');
  };

  const randomizeParams = () => {
    const newParams = { ...params };
    Object.keys(KEYWORDS).forEach(key => {
      const options = KEYWORDS[key];
      const validOptions = options.filter(opt => opt.value !== '');
      if (validOptions.length > 0) {
        const randomOption = validOptions[Math.floor(Math.random() * validOptions.length)];
        newParams[key] = randomOption.value;
      }
    });
    setParams(newParams);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const buildPrompt = () => {
    const subjectParts = [
      params.subject, params.subjectDesc, params.clothing, params.tattoos, params.hairStyle, params.accessories
    ].filter(p => p && p.trim() !== '');
    const subjectText = subjectParts.join(', ');

    const envParts = [params.environment, params.envDesc].filter(p => p && p.trim() !== '');
    const envText = envParts.join(', ');

    const styleParts = [
      params.style, params.generalStyle, params.composition, params.camera, params.lighting, params.atmosphere
    ].filter(p => p && p.trim() !== '');
    const styleText = styleParts.join(', ');

    let finalPromptParts = [];
    if (subjectText) finalPromptParts.push(subjectText);
    if (envText) finalPromptParts.push(envText);
    if (styleText) finalPromptParts.push(`Style info: ${styleText}`);

    let basePrompt = finalPromptParts.join('. ');

    if (uploadedImage) {
      if (isCouple) {
         const coupleInstruction = "Seamlessly blend the couple (two subjects) from the provided input image into this scene. Ensure their outfits are stylistically harmonized and complementary. They should share a coordinated gaze (looking at each other or in the same direction) and interact naturally to show a happy, bonded relationship. Maintain a natural, harmonious composition matching the description.";
         basePrompt = `${coupleInstruction} The scene is: ${basePrompt}`;
      } else {
         const standardInstruction = "Seamlessly blend the subject from the provided input image into this scene. Maintain a natural, harmonious composition, matching the lighting and perspective of the description. Ensure the outfit, tattoos, and accessories are integrated realistically.";
         basePrompt = `${standardInstruction} The scene is: ${basePrompt}`;
      }
    }

    setPrompt(basePrompt);
  };

  const generateImage = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setError('');
    setGeneratedImage(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt + (params.ratio ? ` ${params.ratio}` : ''),
          uploadedImage,
          isCouple,
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const localApiHint = response.status === 404
          ? 'API tạo ảnh chưa chạy. Hãy dùng npx vercel dev hoặc triển khai lên Vercel.'
          : 'Không thể tạo ảnh. Vui lòng thử lại.';
        throw new Error(result.error || localApiHint);
      }

      if (!result.image) {
        throw new Error('Không có dữ liệu ảnh trả về từ AI.');
      }

      setGeneratedImage(result.image);
      const newHistoryItem = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        prompt,
        params: { ...params },
        image: result.image,
        isCouple,
      };
      setHistory(prev => [newHistoryItem, ...prev]);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Đã xảy ra lỗi khi tạo ảnh.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (imgUrl) => {
    const urlToDownload = imgUrl || generatedImage;
    if (urlToDownload) {
      try {
        const blob = base64ToBlob(urlToDownload);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `tao-anh-2026-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (e) {
        console.error("Download failed:", e);
      }
    }
  };

  const restoreFromHistory = (item) => {
    setParams(item.params);
    setPrompt(item.prompt);
    setIsCouple(item.isCouple || false);
    if (item.image) {
      setGeneratedImage(item.image);
    }
    setActiveTab('create');
  };

  const deleteHistoryItem = (id, e) => {
    e.stopPropagation();
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500 selection:text-white">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Tạo Ảnh 2026
            </h1>
          </div>
          <div className="flex gap-4 text-sm text-gray-400">
            <span className="hidden sm:inline">Framework v2.4 (Better Select)</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CỘT TRÁI: CẤU HÌNH */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6 overflow-y-auto max-h-[calc(100vh-100px)] custom-scrollbar pr-2">
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-blue-400" />
                  Cấu Hình
                </h2>
                <div className="flex gap-2">
                  <button onClick={clearAll} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/30 hover:bg-red-900/50 text-red-300 hover:text-red-200 text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95 border border-red-900/30" title="Xóa trắng cấu hình">
                    <Trash2 className="w-3.5 h-3.5" /> Xóa Hết
                  </button>
                  <button onClick={randomizeParams} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95 border border-slate-700" title="Chọn ngẫu nhiên mọi thông số">
                    <Dice5 className="w-3.5 h-3.5" /> Ngẫu nhiên
                  </button>
                </div>
              </div>

              {/* Upload Section */}
              <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-dashed border-slate-600 hover:border-blue-500 transition-colors">
                <label className="block text-sm font-medium text-blue-300 mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4" /> 0. Ảnh của bạn (Tùy chọn)
                </label>
                {!uploadedImage ? (
                  <div className="flex flex-col items-center justify-center py-4 cursor-pointer" onClick={() => fileInputRef.current.click()}>
                    <div className="p-3 bg-slate-800 rounded-full mb-2"><ImageIcon className="w-6 h-6 text-gray-400" /></div>
                    <span className="text-xs text-gray-400 text-center">Nhấn để tải ảnh lên</span>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </div>
                ) : (
                  <div className="relative group flex flex-col gap-3">
                    <div className="relative">
                      <img src={uploadedImage} alt="Uploaded Preview" className="w-full h-32 object-cover rounded-lg border border-slate-600" />
                      <button onClick={removeUploadedImage} className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-900/50 rounded-lg border border-slate-700">
                      <input type="checkbox" id="coupleMode" checked={isCouple} onChange={(e) => setIsCouple(e.target.checked)} className="w-4 h-4 text-pink-500 bg-slate-800 border-gray-600 rounded focus:ring-pink-600 focus:ring-2" />
                      <label htmlFor="coupleMode" className="text-xs text-gray-300 flex items-center gap-1.5 cursor-pointer select-none">
                        {isCouple ? <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" /> : <Users className="w-3.5 h-3.5" />}
                        {isCouple ? "Chế độ Cặp đôi" : "Ảnh có 2 người?"}
                      </label>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Các nhóm thông số - Dùng CustomSelect */}
              <div className="space-y-1">
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-4">1. Phong cách & Bố cục</p>
                 <CustomSelect label='1. Phong cách chung' icon={<Palette size={16}/>} options={KEYWORDS.generalStyle} value={params.generalStyle} onChange={(val) => handleParamChange('generalStyle', val)} placeholder="Chọn phong cách..." />
                 <CustomSelect label='2. Bố cục' icon={<Grid size={16}/>} options={KEYWORDS.composition} value={params.composition} onChange={(val) => handleParamChange('composition', val)} placeholder="Chọn bố cục..." />
                 <CustomSelect label='3. Phong cách (Medium)' icon={<Layers size={16}/>} options={KEYWORDS.style} value={params.style} onChange={(val) => handleParamChange('style', val)} placeholder="Chọn thể loại..." />
                 <CustomSelect label='4. Camera' icon={<Camera size={16}/>} options={KEYWORDS.camera} value={params.camera} onChange={(val) => handleParamChange('camera', val)} placeholder="Chọn camera..." />
              </div>
              <div className="space-y-1 border-t border-slate-800 pt-2">
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-2">2. Đối tượng & Bối cảnh</p>
                 <CustomSelect label='5. Đối Tượng' icon={<Box size={16}/>} options={KEYWORDS.subject} value={params.subject} onChange={(val) => handleParamChange('subject', val)} placeholder="Nhập hoặc chọn đối tượng..." />
                 <CustomSelect label='6. Mô tả Đối tượng' icon={<Type size={16}/>} options={KEYWORDS.subjectDesc} value={params.subjectDesc} onChange={(val) => handleParamChange('subjectDesc', val)} placeholder="Mô tả chi tiết..." />
              </div>
              <div className="space-y-1 border-t border-slate-800 pt-2 bg-slate-800/20 rounded px-2 -mx-2">
                 <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 mt-2">✨ Diện mạo & Phụ kiện</p>
                 <CustomSelect label='Trang phục' icon={<Shirt size={16}/>} options={KEYWORDS.clothing} value={params.clothing} onChange={(val) => handleParamChange('clothing', val)} placeholder="Chọn trang phục..." />
                 <CustomSelect label='Kiểu tóc' icon={<Scissors size={16}/>} options={KEYWORDS.hairStyle} value={params.hairStyle} onChange={(val) => handleParamChange('hairStyle', val)} placeholder="Chọn kiểu tóc..." />
                 <CustomSelect label='Hình xăm' icon={<Stamp size={16}/>} options={KEYWORDS.tattoos} value={params.tattoos} onChange={(val) => handleParamChange('tattoos', val)} placeholder="Chọn hình xăm..." />
                 <CustomSelect label='Phụ kiện' icon={<Watch size={16}/>} options={KEYWORDS.accessories} value={params.accessories} onChange={(val) => handleParamChange('accessories', val)} placeholder="Chọn phụ kiện..." />
              </div>
              <div className="space-y-1 border-t border-slate-800 pt-2">
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-2">3. Bối cảnh & Chi tiết</p>
                 <CustomSelect label='7. Bối Cảnh' icon={<ImageIcon size={16}/>} options={KEYWORDS.environment} value={params.environment} onChange={(val) => handleParamChange('environment', val)} placeholder="Chọn bối cảnh..." />
                 <CustomSelect label='8. Mô tả Bối cảnh' icon={<Type size={16}/>} options={KEYWORDS.envDesc} value={params.envDesc} onChange={(val) => handleParamChange('envDesc', val)} placeholder="Mô tả bối cảnh..." />
                 <CustomSelect label='9. Ánh Sáng' icon={<Sun size={16}/>} options={KEYWORDS.lighting} value={params.lighting} onChange={(val) => handleParamChange('lighting', val)} placeholder="Chọn ánh sáng..." />
                 <CustomSelect label='10. Không Khí' icon={<Zap size={16}/>} options={KEYWORDS.atmosphere} value={params.atmosphere} onChange={(val) => handleParamChange('atmosphere', val)} placeholder="Chọn không khí..." />
                 <CustomSelect label='11. Tỉ lệ khung hình' icon={<Maximize size={16}/>} options={KEYWORDS.ratios} value={params.ratio} onChange={(val) => handleParamChange('ratio', val)} placeholder="Chọn tỉ lệ..." />
              </div>
            </div>
          </div>

          {/* CỘT PHẢI */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
            <div className="flex items-center gap-4 border-b border-slate-800 pb-2">
              <button onClick={() => setActiveTab('create')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === 'create' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><Wand2 className="w-4 h-4" /> Tạo Mới</button>
              <button onClick={() => setActiveTab('history')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === 'history' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><History className="w-4 h-4" /> Lịch Sử <span className="bg-slate-900 text-slate-300 text-xs px-2 py-0.5 rounded-full ml-1">{history.length}</span></button>
            </div>

            {activeTab === 'create' && (
              <div className="flex flex-col gap-6 animate-in fade-in zoom-in duration-300">
                <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg relative group">
                  <label className="text-sm font-medium text-gray-400 mb-2 block flex justify-between">
                    <span>Prompt được tạo tự động:</span>
                    {uploadedImage && <span className={`text-xs font-bold ${isCouple ? 'text-pink-400' : 'text-blue-400'}`}>{isCouple ? "*Chế độ Cặp đôi" : "*Chế độ Ảnh đơn"}</span>}
                  </label>
                  <textarea
                    className="w-full bg-slate-950 text-gray-100 p-4 rounded-lg border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm leading-relaxed resize-none h-32"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Chọn các tham số bên trái để tạo prompt..."
                  />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                     <button onClick={clearAll} className="flex items-center gap-2 px-3 py-1.5 text-xs text-red-300 bg-red-900/30 hover:bg-red-900/50 border border-red-900/30 rounded transition-colors"><Trash2 className="w-3 h-3" /> Xóa Prompt</button>
                     <button onClick={() => handleCopyPrompt()} className={`flex items-center gap-2 px-3 py-1.5 text-xs text-white rounded transition-colors ${isCopied ? 'bg-green-600' : 'bg-slate-800 hover:bg-slate-700'}`}>{isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{isCopied ? 'Đã Copy' : 'Copy Prompt'}</button>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button onClick={randomizeParams} disabled={isLoading} className="w-full py-3 rounded-xl font-bold text-base bg-indigo-600/20 text-indigo-300 border border-indigo-500/50 hover:bg-indigo-600/30 transition-all flex items-center justify-center gap-2"><Dice5 className="w-5 h-5" /> Chọn Ngẫu Nhiên</button>
                  <button onClick={generateImage} disabled={isLoading || !prompt} className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-3 ${isLoading ? 'bg-slate-700 cursor-not-allowed text-slate-400' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/25 text-white'}`}>
                    {isLoading ? <><RefreshCw className="w-6 h-6 animate-spin" /> Đang Khởi Tạo...</> : <><Wand2 className="w-6 h-6" /> {uploadedImage ? (isCouple ? "Ghép Ảnh Đôi & Tạo" : "Ghép Ảnh & Tạo") : "Tạo Hình Ảnh Ngay"}</>}
                  </button>
                </div>
                
                {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">{error}</div>}

                <div className="flex-1 min-h-[400px] bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center relative overflow-hidden shadow-2xl group">
                  {generatedImage ? (
                    <>
                      <img src={generatedImage} alt="AI Generated" className="w-full h-full object-contain max-h-[700px] rounded-lg" />
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={() => handleDownload()} className="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-900 px-4 py-2 rounded-full shadow-lg font-semibold transition-all backdrop-blur-sm"><Download className="w-5 h-5" /> Tải về</button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse"><ImageIcon className="w-10 h-10 text-slate-600" /></div>
                      <h3 className="text-xl font-medium text-slate-300">Chưa có hình ảnh</h3>
                      <p className="text-slate-500 mt-2 max-w-sm mx-auto">{uploadedImage ? "Ảnh của bạn đã sẵn sàng. Hãy chọn thêm diện mạo và nhấn nút tạo!" : "Bạn có thể thử nút 'Chọn Ngẫu Nhiên' phía trên."}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CONTENT: TAB LỊCH SỬ */}
            {activeTab === 'history' && (
              <div className="flex flex-col gap-4 animate-in slide-in-from-right duration-300">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-semibold">Đã tạo gần đây ({history.length})</h3>
                  {history.length > 0 && (
                    <button onClick={() => setHistory([])} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 hover:underline">
                      <Trash2 className="w-3 h-3" /> Xóa tất cả
                    </button>
                  )}
                </div>
                
                {history.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 border border-dashed border-slate-700 rounded-xl">
                    <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Chưa có lịch sử tạo ảnh nào.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {history.map((item) => (
                      <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-4 hover:border-slate-600 transition-colors group">
                        <div className="w-24 h-24 bg-slate-950 rounded-lg overflow-hidden flex-shrink-0 border border-slate-800">
                          {item.image ? (
                            <img src={item.image} alt="Thumbnail" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-6 h-6 text-slate-700" /></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <span className="text-xs text-slate-500 flex items-center gap-1 mb-1"><Clock className="w-3 h-3" /> {item.timestamp}</span>
                              <button onClick={(e) => deleteHistoryItem(item.id, e)} className="text-slate-600 hover:text-red-400 p-1"><X className="w-4 h-4" /></button>
                            </div>
                            <p className="text-sm text-slate-300 line-clamp-2 font-mono" title={item.prompt}>{item.prompt}</p>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => restoreFromHistory(item)} className="text-xs flex items-center gap-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 px-3 py-1.5 rounded-lg font-medium transition-colors"><RotateCcw className="w-3 h-3" /> Sử dụng lại</button>
                            <button onClick={() => handleCopyPrompt(item.prompt)} className="text-xs flex items-center gap-1 bg-slate-800 text-slate-400 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"><Copy className="w-3 h-3" /> Copy Prompt</button>
                            {item.image && <button onClick={() => handleDownload(item.image)} className="text-xs flex items-center gap-1 bg-slate-800 text-slate-400 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors ml-auto"><Download className="w-3 h-3" /> Tải về</button>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 mt-auto py-6 text-center text-slate-500 text-sm">
        <p>© 2026 Tạo Ảnh AI. Built with Gemini & React.</p>
      </footer>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1e293b; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #64748b; }
      `}</style>
    </div>
  );
}
