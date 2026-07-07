import type { StudyCardData } from '../../types';

export const chapter1Data2026Part1: StudyCardData[] = [
  {
    id: "2026-1-1",
    questionJP: "<ruby>図<rt>ず</rt></ruby>のような<ruby>材料<rt>ざいりょう</rt></ruby>と<ruby>断面<rt>だんめん</rt></ruby>が<ruby>等<rt>ひと</rt></ruby>しい 2 つの<ruby>単純梁<rt>たんじゅんばり</rt></ruby>に<ruby>鉛直荷重<rt>えんちょくかじゅう</rt></ruby> P が<ruby>作用<rt>さよう</rt></ruby>している。このとき、<ruby>次<rt>つぎ</rt></ruby>の<ruby>記述<rt>きじゅつ</rt></ruby>のうち、<ruby>最<rt>もっと</rt></ruby>も<ruby>不適当<rt>ふてきとう</rt></ruby>なものはどれか。",
    questionMY: "ပုံပါအတိုင်း ပစ္စည်းနှင့် ဖြတ်ပိုင်းဧရိယာ တူညီသော Simple Beam နှစ်ခုပေါ်တွင် ဒေါင်လိုက်ဝန် P သက်ရောက်နေသည်။ ထိုအခါ အောက်ပါဖော်ပြချက်များအနက် အသင့်လျော်ဆုံးမဟုတ်သည့်အချက်ကို ရွေးချယ်ပါ။",
    options: [
      { id: 1, textJP: "(1) <ruby>支点<rt>してん</rt></ruby> A の<ruby>鉛直方向反力<rt>えんちょくほうこうはんりょく</rt></ruby>は<ruby>支点<rt>してん</rt></ruby> D の<ruby>鉛直反力<rt>えんちょくはんりょく</rt></ruby>より<ruby>小<rt>ちい</rt></ruby>さい。", textMY: "Support A ၏ ဒေါင်လိုက်တုံ့ပြန်အားသည် Support D ၏ ဒေါင်လိုက်တုံ့ပြန်အားထက် ငယ်သည်။" },
      { id: 2, textJP: "(2) <ruby>支点<rt>してん</rt></ruby> C の<ruby>鉛直方向反力<rt>えんちょくほうこうはんりょく</rt></ruby>は<ruby>支点<rt>してん</rt></ruby> F の<ruby>鉛直反力<rt>えんちょくはんりょく</rt></ruby>より<ruby>大<rt>おお</rt></ruby>きい。", textMY: "Support C ၏ ဒေါင်လိုက်တုံ့ပြန်အားသည် Support F ၏ ဒေါင်လိုက်တုံ့ပြန်အားထက် ကြီးသည်။" },
      { id: 3, textJP: "(3) AB <ruby>間<rt>かん</rt></ruby>のせん<ruby>断力<rt>だんりょく</rt></ruby>と DE <ruby>間<rt>かん</rt></ruby>のせん<ruby>断力<rt>だんりょく</rt></ruby>は<ruby>等<rt>ひと</rt></ruby>しい。", textMY: "AB ကြားရှိ Shear Force နှင့် DE ကြားရှိ Shear Force တို့သည် တူညီသည်။" },
      { id: 4, textJP: "(4) <ruby>梁<rt>はり</rt></ruby>に<ruby>生<rt>しょう</rt></ruby>じる<ruby>最大曲<rt>さいだいま</rt></ruby>げモーメントの<ruby>大<rt>おお</rt></ruby>きさは、<ruby>単純梁<rt>たんじゅんばり</rt></ruby> B のほうが<ruby>大<rt>おお</rt></ruby>きい。", textMY: "Beam တွင် ဖြစ်ပေါ်သော အကြီးဆုံး Bending Moment သည် Simple Beam B တွင် ပိုကြီးသည်။" },
      { id: 5, textJP: "(5) B <ruby>点<rt>てん</rt></ruby>の<ruby>鉛直方向<rt>えんちょくほうこう</rt></ruby>のたわみは E <ruby>点<rt>てん</rt></ruby>の<ruby>鉛直方向<rt>えんちょくほうこう</rt></ruby>のたわみより<ruby>小<rt>ちい</rt></ruby>さい。", textMY: "B အမှတ်၏ ဒေါင်လိုက်ကွေးညွှတ်မှု (Deflection) သည် E အမှတ်၏ ဒေါင်လိုက်ကွေးညွှတ်မှုထက် ငယ်သည်။" }
    ],
    correctOptionId: 3,
    explanation: {
      titleMY: "ရှင်းလင်းချက် - Reaction နှင့် Shear Force",
      reasonMY: "Simple Beam A ၏ Reaction မှာ $V_A = V_C = P/2$ ဖြစ်ပြီး၊ Simple Beam B ၏ Reaction မှာ $V_D = 2P/3, V_F = P/3$ ဖြစ်သည်။ ထို့ကြောင့် $Q_{AB} = P/2$ နှင့် $Q_{DE} = 2P/3$ ဖြစ်သဖြင့် မတူညီပါ။",
      memoryTipMY: "Span (အလျား) ကွာခြားပါက Load ၏ Position အရ Shear Force မတူညီနိုင်ပါ။"
    }
  },
  {
    id: "2026-1-2",
    questionJP: "<ruby>図<rt>ず</rt></ruby>のように、<ruby>材料<rt>ざいりょう</rt></ruby>と<ruby>断面形<rt>だんめんけい</rt></ruby>が<ruby>等<rt>ひと</rt></ruby>しく、<ruby>長<rt>なが</rt></ruby>さの<ruby>異<rt>こと</rt></ruby>なる 2 <ruby>本<rt>ほん</rt></ruby>の<ruby>梁<rt>はり</rt></ruby> AB と<ruby>梁<rt>はり</rt></ruby> CD が<ruby>中央<rt>ちゅうおう</rt></ruby> O で<ruby>直角<rt>ちょっかく</rt></ruby>に<ruby>繋<rt>つな</rt></ruby>がっている。この<ruby>梁<rt>はり</rt></ruby>の<ruby>交点<rt>こうてん</rt></ruby> O に<ruby>鉛直荷重<rt>えんちょくかじゅう</rt></ruby> P が<ruby>作用<rt>さよう</rt></ruby>したとき、<ruby>次<rt>つぎ</rt></ruby>の<ruby>記述<rt>きじゅつ</rt></ruby>のうち<ruby>最<rt>もっと</rt></ruby>も<ruby>不適当<rt>ふてきとう</rt></ruby>なものはどれか。",
    questionMY: "ပုံပါအတိုင်း ပစ္စည်းနှင့် ဖြတ်ပိုင်းပုံစံ တူညီပြီး အလျားမတူညီသော Beam AB နှင့် Beam CD နှစ်ခုကို အလယ်ဗဟို O တွင် ထောင့်မှန်အတိုင်း ဆက်ထားသည်။ ဤ Beam ၏ အလယ်မှတ် O တွင် ဒေါင်လိုက်ဝန် P သက်ရောက်သောအခါ အောက်ပါဖော်ပြချက်များအနက် အသင့်လျော်ဆုံးမဟုတ်သည့်အချက်ကို ရွေးချယ်ပါ။",
    options: [
      { id: 1, textJP: "(1) 4 つの<ruby>支点<rt>してん</rt></ruby>の<ruby>鉛直反力<rt>えんちょくはんりょく</rt></ruby>の<ruby>合計<rt>ごうけい</rt></ruby>は P である。", textMY: "Support ၄ ခု၏ ဒေါင်လိုက်တုံ့ပြန်အား စုစုပေါင်းသည် P ဖြစ်သည်။" },
      { id: 2, textJP: "(2) <ruby>梁<rt>はり</rt></ruby> AB、<ruby>梁<rt>はり</rt></ruby> CD ともに<ruby>曲<rt>ま</rt></ruby>げモーメントが<ruby>最大<rt>さいだい</rt></ruby>になるのは O <ruby>点<rt>てん</rt></ruby>である。", textMY: "Beam AB နှင့် Beam CD နှစ်ခုလုံးတွင် Bending Moment အကြီးဆုံးဖြစ်ပေါ်သည်မှာ O အမှတ်တွင် ဖြစ်သည်။" },
      { id: 3, textJP: "(3) <ruby>梁<rt>はり</rt></ruby> AB の<ruby>最大曲<rt>さいだいま</rt></ruby>げモーメントと、<ruby>梁<rt>はり</rt></ruby> CD の<ruby>最大曲<rt>さいだいま</rt></ruby>げモーメントは<ruby>等<rt>ひと</rt></ruby>しい。", textMY: "Beam AB ၏ အကြီးဆုံး Bending Moment နှင့် Beam CD ၏ အကြီးဆုံး Bending Moment တို့သည် တူညီသည်။" },
      { id: 4, textJP: "(4) <ruby>梁<rt>はり</rt></ruby> AB に<ruby>生<rt>しょう</rt></ruby>じるせん<ruby>断力<rt>だんりょく</rt></ruby>は、<ruby>梁<rt>はり</rt></ruby> CD に<ruby>生<rt>しょう</rt></ruby>じるせん<ruby>断力<rt>だんりょく</rt></ruby>よりも<ruby>大<rt>おお</rt></ruby>きい。", textMY: "Beam AB တွင် ဖြစ်ပေါ်သော Shear Force သည် Beam CD တွင် ဖြစ်ပေါ်သော Shear Force ထက် ပိုကြီးသည်။" },
      { id: 5, textJP: "(5) P を<ruby>徐々<rt>じょじょ</rt></ruby>に<ruby>増加<rt>ぞうか</rt></ruby>させたとき、<ruby>曲<rt>ま</rt></ruby>げモーメントによる<ruby>応力度<rt>おうりょくど</rt></ruby>が<ruby>降伏点<rt>こうふくてん</rt></ruby>に<ruby>先<rt>さき</rt></ruby>に<ruby>到達<rt>とうたつ</rt></ruby>するのは<ruby>梁<rt>はり</rt></ruby> AB である。", textMY: "ဝန် P ကို တဖြည်းဖြည်း တိုးမြှင့်သွားပါက Bending Stress ကြောင့် Yield Point သို့ အရင်ရောက်ရှိမည့် Beam မှာ AB ဖြစ်သည်။" }
    ],
    correctOptionId: 3,
    explanation: {
      titleMY: "ရှင်းလင်းချက် - Span နှင့် Moment",
      reasonMY: "Beam AB ၏ Span သည် CD ထက် ထက်ဝက်တိုသဖြင့် AB က ဝန်ပိုယူရသည်။ ထို့ကြောင့် Beam အလယ်ဗဟိုရှိ အကြီးဆုံး Bending Moment မှာ AB က CD ထက် ၄ ဆ ပိုကြီးမည်ဖြစ်သည်။",
      memoryTipMY: "Span တိုသော Beam က ဝန်ပိုယူပြီး Moment လည်း ပိုကြီးပါတယ်။"
    }
  },
  {
    id: "2026-1-3",
    questionJP: "<ruby>図<rt>ず</rt></ruby>のような<ruby>水平荷重<rt>すいへいかじゅう</rt></ruby> P を<ruby>受<rt>う</rt></ruby>けるラーメン<ruby>骨組<rt>ほねぐみ</rt></ruby>について、<ruby>次<rt>つぎ</rt></ruby>の<ruby>記述<rt>きじゅつ</rt></ruby>のうち<ruby>最<rt>もっと</rt></ruby>も<ruby>不適当<rt>ふてきとう</rt></ruby>なものはどれか。",
    questionMY: "ပုံပါအတိုင်း အလျားလိုက်ဝန် P သက်ရောက်နေသော Rigid Frame (ラーメン) နှင့်ပတ်သက်၍ အသင့်လျော်ဆုံးမဟုတ်သည့်အချက်ကို ရွေးချယ်ပါ။",
    options: [
      { id: 1, textJP: "(1) <ruby>支点<rt>してん</rt></ruby> C には<ruby>鉛直下向<rt>えんちょくしたむ</rt></ruby>きの<ruby>反力<rt>はんりょく</rt></ruby>が<ruby>生<rt>しょう</rt></ruby>じる。", textMY: "Support C တွင် အောက်ဘက်သို့ ဒေါင်လိုက်တုံ့ပြန်အား ဖြစ်ပေါ်သည်။" },
      { id: 2, textJP: "(2) <ruby>柱<rt>はしら</rt></ruby> AB には<ruby>圧縮軸力<rt>あっしゅくじくりょく</rt></ruby>が<ruby>生<rt>しょう</rt></ruby>じる。", textMY: "Column AB တွင် Axial Compression ဖြစ်ပေါ်သည်။" },
      { id: 3, textJP: "(3) <ruby>柱<rt>はしら</rt></ruby> AB の<ruby>曲<rt>ま</rt></ruby>げ<ruby>変形<rt>へんけい</rt></ruby>は<ruby>右<rt>みぎ</rt></ruby>に<ruby>凸<rt>とつ</rt></ruby>である。", textMY: "Column AB ၏ Bending Deformation သည် ညာဘက်သို့ ခုံးနေသည်။" },
      { id: 4, textJP: "(4) <ruby>梁<rt>はり</rt></ruby> BC には<ruby>軸力<rt>じくりょく</rt></ruby>は<ruby>生<rt>しょう</rt></ruby>じない。", textMY: "Beam BC တွင် Axial Force မဖြစ်ပေါ်ပါ။" },
      { id: 5, textJP: "(5) <ruby>梁<rt>はり</rt></ruby> BC の<ruby>曲<rt>ま</rt></ruby>げ<ruby>変形<rt>へんけい</rt></ruby>は<ruby>上<rt>うえ</rt></ruby>に<ruby>凸<rt>とつ</rt></ruby>である。", textMY: "Beam BC ၏ Bending Deformation သည် အထက်သို့ ခုံးနေသည်။" }
    ],
    correctOptionId: 3,
    explanation: {
      titleMY: "ရှင်းလင်းချက် - Bending Deformation",
      reasonMY: "ဘယ်ဘက်မှ ညာဘက်သို့ ဝန် P တွန်းလိုက်သောအခါ Column AB သည် ဘယ်ဘက်သို့ ခုံး (凸) သွားမည်ဖြစ်သည်။ ညာဘက်သို့ ခုံးမည်မဟုတ်ပါ။",
      memoryTipMY: "တွန်းတဲ့ဘက်နဲ့ ဆန့်ကျင်ဘက်ကို ခုံးထွက်ပါတယ်။"
    }
  },
  {
    id: "2026-1-4",
    questionJP: "<ruby>図<rt>ず</rt></ruby>のような<ruby>荷重<rt>かじゅう</rt></ruby>を<ruby>受<rt>う</rt></ruby>けるトラス<ruby>梁<rt>はり</rt></ruby>について、ア、イ、ウ、エ、オの<ruby>各部材<rt>かくぶざい</rt></ruby>に<ruby>生<rt>しょう</rt></ruby>じる<ruby>軸力<rt>じくりょく</rt></ruby>に<ruby>関<rt>かん</rt></ruby>する<ruby>次<rt>つぎ</rt></ruby>の<ruby>記述<rt>きじゅつ</rt></ruby>のうち、<ruby>最<rt>もっと</rt></ruby>も<ruby>不適当<rt>ふてきとう</rt></ruby>なものはどれか。",
    questionMY: "ပုံပါအတိုင်း ဝန်သက်ရောက်နေသော Truss တွင် Member အ (ア)၊ အီ (イ)၊ ဥ (ウ)၊ ဧ (エ)၊ အို (オ) တို့၌ ဖြစ်ပေါ်သော Axial Force နှင့်ပတ်သက်၍ အသင့်လျော်ဆုံးမဟုတ်သည့်အချက်ကို ရွေးချယ်ပါ။",
    options: [
      { id: 1, textJP: "(1) <ruby>部材<rt>ぶざい</rt></ruby>アには、<ruby>引張<rt>ひっぱ</rt></ruby>りの<ruby>軸力<rt>じくりょく</rt></ruby>が<ruby>生<rt>しょう</rt></ruby>じる。", textMY: "Member အ (A) တွင် Tensile Axial Force ဖြစ်ပေါ်သည်။" },
      { id: 2, textJP: "(2) <ruby>部材<rt>ぶざい</rt></ruby>アに<ruby>生<rt>しょう</rt></ruby>じる<ruby>軸力<rt>じくりょく</rt></ruby>と、<ruby>部材<rt>ぶざい</rt></ruby>イに<ruby>生<rt>しょう</rt></ruby>じる<ruby>軸力<rt>じくりょく</rt></ruby>は、その<ruby>大<rt>おお</rt></ruby>きさが<ruby>等<rt>ひと</rt></ruby>しい。", textMY: "Member အ (A) တွင် ဖြစ်ပေါ်သော Axial Force နှင့် Member အီ (I) တွင် ဖြစ်ပေါ်သော Axial Force တို့၏ ပမာဏသည် တူညီသည်။" },
      { id: 3, textJP: "(3) <ruby>部材<rt>ぶざい</rt></ruby>ウには<ruby>圧縮<rt>あっしゅく</rt></ruby>の<ruby>軸力<rt>じくりょく</rt></ruby>が<ruby>生<rt>しょう</rt></ruby>じる。", textMY: "Member ဥ (U) တွင် Compressive Axial Force ဖြစ်ပေါ်သည်။" },
      { id: 4, textJP: "(4) <ruby>部材<rt>ぶざい</rt></ruby>エには<ruby>引張<rt>ひっぱ</rt></ruby>りの<ruby>軸力<rt>じくりょく</rt></ruby>が<ruby>生<rt>しょう</rt></ruby>じる。", textMY: "Member ဧ (E) တွင် Tensile Axial Force ဖြစ်ပေါ်သည်။" },
      { id: 5, textJP: "(5) <ruby>部材<rt>ぶざい</rt></ruby>エに<ruby>生<rt>しょう</rt></ruby>じる<ruby>軸力<rt>じくりょく</rt></ruby>の<ruby>大<rt>おお</rt></ruby>きさは、<ruby>部材<rt>ぶざい</rt></ruby>オに<ruby>生<rt>しょう</rt></ruby>じる<ruby>軸力<rt>じくりょく</rt></ruby>の<ruby>大<rt>おお</rt></ruby>きさよりも<ruby>大<rt>おお</rt></ruby>きい。", textMY: "Member ဧ (E) တွင် ဖြစ်ပေါ်သော Axial Force ၏ ပမာဏသည် Member အို (O) တွင် ဖြစ်ပေါ်သော Axial Force ၏ ပမာဏထက် ကြီးသည်။" }
    ],
    correctOptionId: 2,
    explanation: {
      titleMY: "ရှင်းလင်းချက် - Truss Axial Force",
      reasonMY: "Member အီ (イ) တွင် ဖြစ်ပေါ်သော Axial Force သည် Member  (ア) တွင် ဖြစ်ပေါ်သော Axial Force ထက် ပိုမိုကြီးမားသည်။ ထို့ကြောင့် (2) သည် မှားယွင်းပါသည်။",
      memoryTipMY: "Load ဖြတ်သန်းရာ အောက်ပိုင်း Member တွေက Force ပိုများတတ်ပါတယ်။"
    }
  },
  {
    id: "2026-1-5",
    questionJP: "<ruby>引張強度<rt>ひっぱりきょうど</rt></ruby>と<ruby>圧縮強度<rt>あっしゅくきょうど</rt></ruby>が<ruby>等<rt>ひと</rt></ruby>しい<ruby>部材<rt>ぶざい</rt></ruby>で<ruby>構成<rt>こうせい</rt></ruby>された<ruby>下記<rt>かき</rt></ruby>のトラス<ruby>梁<rt>はり</rt></ruby>に 2 つの<ruby>鉛直荷重<rt>えんちょくかじゅう</rt></ruby> P が<ruby>作用<rt>さよう</rt></ruby>している。P を<ruby>増加<rt>ぞうか</rt></ruby>させたとき、<ruby>最初<rt>さいしょ</rt></ruby>に<ruby>破壊<rt>はかい</rt></ruby>する<ruby>部材<rt>ぶざい</rt></ruby>はどれか。",
    questionMY: "Tensile Strength နှင့် Compressive Strength တူညီသော Member များဖြင့် ဖွဲ့စည်းထားသည့် Truss တွင် ဒေါင်လိုက်ဝန် P နှစ်ခု သက်ရောက်နေသည်။ P ကို တိုးမြှင့်လိုက်သောအခါ ပထမဆုံး ကျိုးပဲ့မည့် Member မှာ အဘယ်နည်း။",
    options: [
      { id: 1, textJP: "(1) <ruby>部材<rt>ぶざい</rt></ruby>ア", textMY: "Member a" },
      { id: 2, textJP: "(2) <ruby>部材<rt>ぶざい</rt></ruby>イ", textMY: "Member i" },
      { id: 3, textJP: "(3) <ruby>部材<rt>ぶざい</rt></ruby>ウ", textMY: "Member u" },
      { id: 4, textJP: "(4) <ruby>部材<rt>ぶざい</rt></ruby>エ", textMY: "Member e" },
      { id: 5, textJP: "(5) <ruby>部材<rt>ぶざい</rt></ruby>オ", textMY: "Member o" }
    ],
    correctOptionId: 1,
    explanation: {
      titleMY: "ရှင်းလင်းချက် - Member Force",
      reasonMY: "Member တစ်ခုချင်းစီ၏ Force များကို တွက်ချက်ကြည့်ပါက Member အ တွင် √2P (Tensile), အီ တွင် P (Compressive), ဥ တွင် 0, ဧ တွင် P (Tensile), အို တွင် 0 ဖြစ်ပေါ်သည်။ √2P သည် အကြီးဆုံးဖြစ်သဖြင့် အ (ア) က အရင်ဆုံးကျိုးပဲ့မည်။",
      memoryTipMY: "ထောင့်ဖြတ် (Diagonal) Member အ (ア) တွင် Force အများဆုံးဖြစ်ပေါ်သည်။"
    }
  },
  {
    id: "2026-1-6",
    questionJP: "<ruby>図<rt>ず</rt></ruby>のような<ruby>荷重<rt>かじゅう</rt></ruby>を<ruby>受<rt>う</rt></ruby>ける<ruby>同一形状<rt>どういつけいじょう</rt></ruby>の 2 つのトラス<ruby>梁<rt>はり</rt></ruby>について、<ruby>次<rt>つぎ</rt></ruby>の<ruby>記述<rt>きじゅつ</rt></ruby>のうち<ruby>最<rt>もっと</rt></ruby>も<ruby>不適当<rt>ふてきとう</rt></ruby>なものはどれか。",
    questionMY: "ပုံပါအတိုင်း ဝန်သက်ရောက်နေသော ပုံစံတူ Truss နှစ်ခုနှင့် ပတ်သက်၍ အသင့်လျော်ဆုံးမဟုတ်သည့်အချက်ကို ရွေးချယ်ပါ။",
    options: [
      { id: 1, textJP: "(1) <ruby>支点<rt>してん</rt></ruby> A、<ruby>支点<rt>してん</rt></ruby> B に<ruby>生<rt>しょう</rt></ruby>じる<ruby>反力<rt>はんりょく</rt></ruby>はどちらのトラス<ruby>梁<rt>はり</rt></ruby>も<ruby>等<rt>ひと</rt></ruby>しい。", textMY: "Support A နှင့် B တွင် ဖြစ်ပေါ်သော Reaction သည် Truss နှစခုလုံး တူညီသည်။" },
      { id: 2, textJP: "(2) <ruby>部材<rt>ぶざい</rt></ruby>アに<ruby>生<rt>しょう</rt></ruby>じる<ruby>軸力<rt>じくりょく</rt></ruby>はトラス<ruby>梁<rt>はり</rt></ruby>Ⅱのほうが<ruby>大<rt>おお</rt></ruby>きい。", textMY: "Member အ တွင် ဖြစ်ပေါ်သော Axial Force သည် Truss II တွင် ပိုကြီးသည်။" },
      { id: 3, textJP: "(3) <ruby>部材<rt>ぶざい</rt></ruby>イに<ruby>生<rt>しょう</rt></ruby>じる<ruby>軸力<rt>じくりょく</rt></ruby>はトラス<ruby>梁<rt>はり</rt></ruby>Ⅰのほうが<ruby>大<rt>おお</rt></ruby>きい。", textMY: "Member အီ တွင် ဖြစ်ပေါ်သော Axial Force သည် Truss I တွင် ပိုကြီးသည်။" },
      { id: 4, textJP: "(4) <ruby>部材<rt>ぶざい</rt></ruby>ウにはどちらのトラス<ruby>梁<rt>はり</rt></ruby>も<ruby>軸力<rt>じくりょく</rt></ruby>は<ruby>生<rt>しょう</rt></ruby>じない。", textMY: "Member ဥ တွင် Truss နှစ်ခုလုံး Axial Force မဖြစ်ပေါ်ပါ။" },
      { id: 5, textJP: "(5) <ruby>部材<rt>ぶざい</rt></ruby>エに<ruby>生<rt>しょう</rt></ruby>じる<ruby>軸力<rt>じくりょく</rt></ruby>はトラス<ruby>梁<rt>はり</rt></ruby>Ⅰのほうが<ruby>大<rt>おお</rt></ruby>きい。", textMY: "Member ဧ တွင် ဖြစ်ပေါ်သော Axial Force သည် Truss I တွင် ပိုကြီးသည်။" }
    ],
    correctOptionId: 2,
    explanation: {
      titleMY: "ရှင်းလင်းချက် - Truss Member Forces",
      reasonMY: "Member အ တွင် ဖြစ်ပေါ်သော Axial Force မှာ Truss I နှင့် II နှစ်ခုစလုံးတွင် 1.5P (Compressive) ဖြစ်၍ တူညီပါသည်။ ထို့ကြောင့် 'Truss II တွင် ပိုကြီးသည်' ဆိုသောအချက်မှာ မှားယွင်းပါသည်။",
      memoryTipMY: "Reaction တူညီသောကြောင့် အစွန်ဆုံး အပေါ် Member ၏ Force မှာ တူညီပါသည်။"
    }
  }
];
