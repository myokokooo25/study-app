import type { StudyCardData } from '../../types';

export const chapter1Data2026Part2: StudyCardData[] = [
  {
    id: "2026-1-7",
    questionJP: "<ruby>構造設計<rt>こうぞうせっけい</rt></ruby>に<ruby>関<rt>かん</rt></ruby>する<ruby>次<rt>つぎ</rt></ruby>の<ruby>記述<rt>きじゅつ</rt></ruby>のうち、<ruby>最<rt>もっと</rt></ruby>も<ruby>不適当<rt>ふてきとう</rt></ruby>なものはどれか。",
    questionMY: "Structural Design နှင့်ပတ်သက်၍ အောက်ပါဖော်ပြချက်များအနက် အသင့်လျော်ဆုံးမဟုတ်သည့်အချက်ကို ရွေးချယ်ပါ။",
    options: [
      { id: 1, textJP: "(1) <ruby>建築基準法<rt>けんちくきじゅんほう</rt></ruby>を<ruby>遵守<rt>じゅんしゅ</rt></ruby>した<ruby>構造設計<rt>こうぞうせっけい</rt></ruby>を<ruby>行<rt>おこな</rt></ruby>っていれば、どんなに<ruby>大<rt>おお</rt></ruby>きな<ruby>外力<rt>がいりょく</rt></ruby>が<ruby>作用<rt>さよう</rt></ruby>しても<ruby>鉄骨構造物<rt>てっこつこうぞうぶつ</rt></ruby>が<ruby>損傷<rt>そんしょう</rt></ruby>を<ruby>受<rt>う</rt></ruby>けることはほとんどない。", textMY: "Building Standard Law ကို လိုက်နာ၍ ဒီဇိုင်းဆွဲထားပါက မည်မျှကြီးမားသော ပြင်ပအား သက်ရောက်စေကာမူ Steel Structure သည် ပျက်စီးမှုဖြစ်ပေါ်လေ့မရှိပါ။" },
      { id: 2, textJP: "(2) <ruby>設計者<rt>せっけいしゃ</rt></ruby>は、<ruby>構造設計<rt>こうぞうせっけい</rt></ruby>の<ruby>段階<rt>だんかい</rt></ruby>から<ruby>柱梁仕口等<rt>ちゅうりょうしぐちとう</rt></ruby>の<ruby>納<rt>おさ</rt></ruby>まりや<ruby>溶接施工<rt>ようせつせこう</rt></ruby>の<ruby>難易度<rt>なんいど</rt></ruby>を<ruby>考慮<rt>こうりょ</rt></ruby>して<ruby>部材断面<rt>ぶざいだんめん</rt></ruby>を<ruby>選択<rt>せんたく</rt></ruby>するよう<ruby>努<rt>つと</rt></ruby>めるべきである。", textMY: "ဒီဇိုင်နာသည် အစပိုင်းမှစ၍ Column-Beam Joint ဖွဲ့စည်းပုံနှင့် ဂဟေဆက်ရန် အခက်အခဲများကို ထည့်သွင်းစဉ်းစားကာ ဖြတ်ပိုင်းပုံစံများကို ရွေးချယ်သင့်သည်။" },
      { id: 3, textJP: "(3) <ruby>構造設計<rt>こうぞうせっけい</rt></ruby>では<ruby>骨組<rt>ほねぐみ</rt></ruby>の<ruby>耐震性能<rt>たいしんせいのう</rt></ruby>だけでなく、<ruby>外壁<rt>がいへき</rt></ruby>パネル<ruby>等<rt>とう</rt></ruby>の<ruby>仕上<rt>しあ</rt></ruby>げ<ruby>材<rt>ざい</rt></ruby>が<ruby>地震時<rt>じしんじ</rt></ruby>に<ruby>脱落<rt>だつらく</rt></ruby>しないような<ruby>検討<rt>けんとう</rt></ruby>が<ruby>不可欠<rt>ふかけつ</rt></ruby>である。", textMY: "ဘောင်၏ ငလျင်ခံနိုင်ရည်သာမက ပြင်ပနံရံပြားကဲ့သို့သော Finishing material များ ငလျင်လှုပ်စဉ် ပြုတ်မကျစေရန် ထည့်သွင်းစဉ်းစားရန် အရေးကြီးသည်။" },
      { id: 4, textJP: "(4) <ruby>鉄骨<rt>てっこつ</rt></ruby>の<ruby>構造設計<rt>こうぞうせっけい</rt></ruby>では、<ruby>建物<rt>たてもの</rt></ruby>の<ruby>強度<rt>きょうど</rt></ruby>だけでなく<ruby>日常的<rt>にちじょうてき</rt></ruby>に<ruby>作用<rt>さよう</rt></ruby>する<ruby>荷重<rt>かじゅう</rt></ruby>に<ruby>対<rt>たい</rt></ruby>する<ruby>振動<rt>しんどう</rt></ruby>について<ruby>考慮<rt>こうりょ</rt></ruby>することも<ruby>重要<rt>じゅうよう</rt></ruby>である。", textMY: "ခိုင်ခံ့မှုသာမက နေ့စဉ်သက်ရောက်နေသော ဝန်များကြောင့် ဖြစ်ပေါ်သော တုန်ခါမှုများကိုပါ ထည့်သွင်းစဉ်းစားရန် အရေးကြီးသည်။" },
      { id: 5, textJP: "(5) <ruby>鋼材<rt>こうざい</rt></ruby>は<ruby>高<rt>たか</rt></ruby>い<ruby>靭性<rt>じんせい</rt></ruby>（ねばり<ruby>強<rt>づよ</rt></ruby>さ）を<ruby>有<rt>ゆう</rt></ruby>しているため、<ruby>座屈<rt>ざくつ</rt></ruby>や<ruby>破断<rt>はだん</rt></ruby>が<ruby>生<rt>しょう</rt></ruby>じなければ<ruby>鉄骨構造物<rt>てっこつこうぞうぶつ</rt></ruby>は<ruby>大地震時<rt>だいじしんじ</rt></ruby>においても<ruby>優<rt>すぐ</rt></ruby>れた<ruby>耐震性能<rt>たいしんせいのう</rt></ruby>を<ruby>有<rt>ゆう</rt></ruby>している。", textMY: "သံမဏိသည် မြင့်မားသော Toughness ရှိသောကြောင့် Buckling သို့မဟုတ် Fracture မဖြစ်ပေါ်သရွေ့ ကြီးမားသောငလျင်တွင် ကောင်းမွန်သော ငလျင်ခံနိုင်ရည် ရှိသည်။" }
    ],
    correctOptionId: 1,
    explanation: {
      titleMY: "ရှင်းလင်းချက် - 建築基準法 (Building Standard Law)",
      reasonMY: "Building Standard Law သည် အလွန်ရှားပါးသော အင်အားကြီးငလျင်များအတွက် 'အဆောက်အဦမပြိုကျစေရန်' ရည်ရွယ်ပြီး အနည်းငယ်ပျက်စီးမှုကို ခွင့်ပြုထားပါသည်။ ထို့ကြောင့် လုံးဝမပျက်စီးဘူး ဆိုသည်မှာ မှားယွင်းပါသည်။",
      memoryTipMY: "ဥပဒေက 'မပြိုကျအောင်' (Collapse prevention) ပဲ အာမခံပါတယ်။ လုံးဝမပျက်စီးတာ မဟုတ်ပါဘူး။"
    }
  },
  {
    id: "2026-1-8",
    questionJP: "<ruby>鉄骨構造<rt>てっこつこうぞう</rt></ruby>に<ruby>関<rt>かん</rt></ruby>する<ruby>次<rt>つぎ</rt></ruby>の<ruby>記述<rt>きじゅつ</rt></ruby>のうち、<ruby>最<rt>もっと</rt></ruby>も<ruby>不適当<rt>ふてきとう</rt></ruby>なものはどれか。",
    questionMY: "Steel Structure နှင့်ပတ်သက်၍ အောက်ပါဖော်ပြချက်များအနက် အသင့်လျော်ဆုံးမဟုတ်သည့်အချက်ကို ရွေးချယ်ပါ။",
    options: [
      { id: 1, textJP: "(1) わが<ruby>国<rt>くに</rt></ruby>における<ruby>鉄骨<rt>てっこつ</rt></ruby>ラーメン<ruby>構造<rt>こうぞう</rt></ruby>の<ruby>建物<rt>たてもの</rt></ruby>には、<ruby>角形鋼管柱<rt>かくがたこうかんばしら</rt></ruby>とH<ruby>形鋼梁<rt>がたこうはり</rt></ruby>が<ruby>用<rt>もち</rt></ruby>いられることが<ruby>多<rt>おお</rt></ruby>い。", textMY: "ဂျပန်နိုင်ငံရှိ Steel Rigid Frame အဆောက်အဦများတွင် Box Column (角形鋼管) နှင့် H-beam များကို အများဆုံးအသုံးပြုသည်။" },
      { id: 2, textJP: "(2) <ruby>鋼材<rt>こうざい</rt></ruby>はコンクリートや<ruby>木材<rt>もくざい</rt></ruby>より<ruby>比重<rt>ひじゅう</rt></ruby>が<ruby>大<rt>おお</rt></ruby>きいが、これらの<ruby>材料<rt>ざいりょう</rt></ruby>よりもはるかに<ruby>強<rt>つよ</rt></ruby>く、<ruby>高<rt>たか</rt></ruby>い<ruby>靭性<rt>じんせい</rt></ruby>を<ruby>有<rt>ゆう</rt></ruby>している。", textMY: "သံမဏိသည် ကွန်ကရစ်နှင့် သစ်သားထက် သိပ်သည်းဆများသော်လည်း ၎င်းတို့ထက် များစွာခိုင်ခံ့ပြီး Toughness မြင့်မားသည်။" },
      { id: 3, textJP: "(3) トラス<ruby>構造<rt>こうぞう</rt></ruby>は、<ruby>三角形<rt>さんかくけい</rt></ruby>を<ruby>基本形状<rt>きほんけいじょう</rt></ruby>として<ruby>部材<rt>ぶざい</rt></ruby>を<ruby>組<rt>く</rt></ruby>み<ruby>合<rt>あ</rt></ruby>わせ、<ruby>部材<rt>ぶざい</rt></ruby>の<ruby>軸方向力<rt>じくほうこうりょく</rt></ruby>で<ruby>外力<rt>がいりょく</rt></ruby>に<ruby>抵抗<rt>ていこう</rt></ruby>する<ruby>構造形式<rt>こうぞうけいしき</rt></ruby>である。", textMY: "Truss Structure သည် တြိဂံပုံစံကို အခြေခံပြီး Member များ၏ Axial Force ဖြင့် ပြင်ပအားကို ခုခံသောပုံစံဖြစ်သည်။" },
      { id: 4, textJP: "(4) <ruby>免震構造<rt>めんしんこうぞう</rt></ruby>は、<ruby>建物全体<rt>たてものぜんたい</rt></ruby>を<ruby>変形<rt>へんけい</rt></ruby>しやすいように<ruby>柔<rt>やわ</rt></ruby>らかく<ruby>設計<rt>せっけい</rt></ruby>し、その<ruby>変形<rt>へんけい</rt></ruby>をダンパーなどのエネルギー<ruby>吸収<rt>きゅうしゅう</rt></ruby>デバイスで<ruby>制御<rt>せいぎょ</rt></ruby>することによって<ruby>高<rt>たか</rt></ruby>い<ruby>耐震性能<rt>たいしんせいのう</rt></ruby>を<ruby>実現<rt>じつげん</rt></ruby>した<ruby>構造形式<rt>こうぞうけいしき</rt></ruby>である。<ruby>特<rt>とく</rt></ruby>に<ruby>軟弱地盤<rt>なんじゃくじばん</rt></ruby>に<ruby>建<rt>た</rt></ruby>つ<ruby>建物<rt>たてもの</rt></ruby>に<ruby>採用<rt>さいよう</rt></ruby>されることが<ruby>多<rt>おお</rt></ruby>い。", textMY: "Base-isolated Structure (免震) သည် အဆောက်အဦကို ပျော့ပျောင်းအောင်ဒီဇိုင်းဆွဲ၍ Damper ဖြင့်ထိန်းချုပ်သောစနစ်ဖြစ်ပြီး အထူးသဖြင့် မြေပျော့သောနေရာများတွင် အသုံးပြုသည်။" },
      { id: 5, textJP: "(5) <ruby>既存鉄筋<rt>きぞんてっきん</rt></ruby>コンクリート<ruby>造<rt>ぞう</rt></ruby>の<ruby>耐震改修<rt>たいしんかいしゅう</rt></ruby>に<ruby>多用<rt>たよう</rt></ruby>されている<ruby>鉄骨枠付<rt>てっこつわくつ</rt></ruby>き<ruby>補強<rt>ほきょう</rt></ruby>は、<ruby>無収縮<rt>むしゅうしゅく</rt></ruby>モルタルを<ruby>用<rt>もち</rt></ruby>いて<ruby>両者<rt>りょうしゃ</rt></ruby>を<ruby>一体化<rt>いったいか</rt></ruby>したものである。", textMY: "RC အဆောက်အဦများကို ငလျင်ဒဏ်ခံနိုင်ရည်မြှင့်တင်ရာတွင် သံမဏိဘောင်ဖြင့် အားဖြည့်ခြင်း (Non-shrink mortar သုံး၍ တစ်သားတည်းဖြစ်စေခြင်း) ကို အများဆုံးအသုံးပြုသည်။" }
    ],
    correctOptionId: 4,
    explanation: {
      titleMY: "ရှင်းလင်းချက် - 免震 と 制振",
      reasonMY: "အချက် (4) သည် Base-isolated (免震) အကြောင်းမဟုတ်ဘဲ Vibration-control (制振 - Damper ဖြင့် စွမ်းအင်စုပ်ယူသောစနစ်) အကြောင်းကို ဖော်ပြထားခြင်းဖြစ်သည်။ ထို့ပြင် Base-isolated စနစ်ကို မြေပျော့သောနေရာများ (軟弱地盤) တွင် အသုံးမပြုပါ။",
      memoryTipMY: "Damper နဲ့ စွမ်းအင်စုပ်တာက 制振 (Seishin) ပါ။ 免震 (Menshin) က Base ကို ခွဲထုတ်တာပါ။"
    }
  },
  {
    id: "2026-1-9",
    questionJP: "<ruby>鉄骨部材<rt>てっこつぶざい</rt></ruby>の<ruby>特性<rt>とくせい</rt></ruby>に<ruby>関<rt>かん</rt></ruby>する<ruby>次<rt>つぎ</rt></ruby>の<ruby>記述<rt>きじゅつ</rt></ruby>のうち、<ruby>最<rt>もっと</rt></ruby>も<ruby>不適当<rt>ふてきとう</rt></ruby>なものはどれか。",
    questionMY: "Steel Member များ၏ လက္ခဏာများနှင့်ပတ်သက်၍ အောက်ပါဖော်ပြချက်များအနက် အသင့်လျော်ဆုံးမဟုတ်သည့်အချက်ကို ရွေးချယ်ပါ။",
    options: [
      { id: 1, textJP: "(1) ボルト<ruby>孔<rt>あな</rt></ruby>の<ruby>中心<rt>ちゅうしん</rt></ruby>から<ruby>接合<rt>せつごう</rt></ruby>される<ruby>材<rt>ざい</rt></ruby>の<ruby>縁端<rt>えんたん</rt></ruby>までの<ruby>距離<rt>きょり</rt></ruby>（<ruby>縁端距離<rt>えんたんきょり</rt></ruby>）が<ruby>十分確保<rt>じゅうぶんかくほ</rt></ruby>されていないと、はしぬけ<ruby>破断<rt>はだん</rt></ruby>によってボルトの<ruby>耐力<rt>たいりょく</rt></ruby>が<ruby>十分<rt>じゅうぶん</rt></ruby>に<ruby>発揮<rt>はっき</rt></ruby>されないことがある。", textMY: "Edge Distance မလုံလောက်ပါက End Tear-out Failure ကြောင့် Bolt ၏ ခံနိုင်ရည်အပြည့်အဝ မရရှိနိုင်ပါ။" },
      { id: 2, textJP: "(2) <ruby>細長<rt>ほそなが</rt></ruby>い<ruby>部材<rt>ぶざい</rt></ruby>に<ruby>中心圧縮力<rt>ちゅうしんあっしゅくりょく</rt></ruby>を<ruby>作用<rt>さよう</rt></ruby>させたとき、<ruby>部材<rt>ぶざい</rt></ruby>が<ruby>曲<rt>ま</rt></ruby>がる<ruby>現象<rt>げんしょう</rt></ruby>を<ruby>曲<rt>ま</rt></ruby>げ<ruby>座屈<rt>ざくつ</rt></ruby>という。", textMY: "ရှည်လျားသွယ်လျသော Member ကို Axial Compression ပေးသောအခါ ကွေးသွားခြင်းကို Flexural Buckling ဟုခေါ်သည်။" },
      { id: 3, textJP: "(3) <ruby>鉄骨部材<rt>てっこつぶざい</rt></ruby>の<ruby>板要素<rt>いたようそ</rt></ruby>が<ruby>薄<rt>うす</rt></ruby>すぎると、<ruby>部材全体<rt>ぶざいぜんたい</rt></ruby>としての<ruby>座屈<rt>ざくつ</rt></ruby>が<ruby>生<rt>しょう</rt></ruby>じる<ruby>前<rt>まえ</rt></ruby>に<ruby>板要素<rt>いたようそ</rt></ruby>が<ruby>波打<rt>なみう</rt></ruby>つことがある。これを<ruby>局部座屈<rt>きょくぶざくつ</rt></ruby>という。", textMY: "Plate element များ ပါးလွန်းပါက Member တစ်ခုလုံး Buckling မဖြစ်မီ အပြားများ လှိုင်းတွန့်သွားနိုင်သည်။ ယင်းကို Local Buckling ဟုခေါ်သည်။" },
      { id: 4, textJP: "(4) <ruby>長<rt>なが</rt></ruby>いH<ruby>形鋼梁<rt>がたこうはり</rt></ruby>が<ruby>曲<rt>ま</rt></ruby>げモーメントを<ruby>受<rt>う</rt></ruby>けるとき、<ruby>圧縮側<rt>あっしゅくがわ</rt></ruby>のフランジが<ruby>横方向<rt>よこほうこう</rt></ruby>にたわみ、<ruby>梁全体<rt>はりぜんたい</rt></ruby>がねじりを<ruby>伴<rt>ともな</rt></ruby>って<ruby>大<rt>おお</rt></ruby>きく<ruby>変形<rt>へんけい</rt></ruby>する<ruby>場合<rt>ばあい</rt></ruby>がある。これを<ruby>横座屈<rt>よこざくつ</rt></ruby>という。", textMY: "ရှည်လျားသော H-beam သည် Bending Moment ခံရသောအခါ Compression ဘက်ရှိ Flange သည် ဘေးတိုက်ကွေးသွားပြီး လိမ်သွားတတ်သည်။ ယင်းကို Lateral Buckling ဟုခေါ်သည်။" },
      { id: 5, textJP: "(5) <ruby>鋼材<rt>こうざい</rt></ruby>は<ruby>弾性剛性<rt>だんせいごうせい</rt></ruby>が<ruby>高<rt>たか</rt></ruby>い<ruby>材料<rt>ざいりょう</rt></ruby>であるため、<ruby>曲<rt>ま</rt></ruby>げモーメントに<ruby>対<rt>たい</rt></ruby>する<ruby>強<rt>つよ</rt></ruby>さが<ruby>十分<rt>じゅうぶん</rt></ruby>であれば<ruby>変形<rt>へんけい</rt></ruby>が<ruby>過大<rt>かだい</rt></ruby>になったり、<ruby>振動<rt>しんどう</rt></ruby>で<ruby>居住者<rt>きょじゅうしゃ</rt></ruby>に<ruby>不快感<rt>ふかいかん</rt></ruby>を<ruby>与<rt>あた</rt></ruby>えたりすることはほとんどない。", textMY: "သံမဏိသည် Elastic Stiffness မြင့်မားသောကြောင့် Bending Moment ကို ခံနိုင်ရည်ရှိရုံဖြင့် အလွန်အမင်းပုံပျက်ခြင်း သို့မဟုတ် တုန်ခါမှုကြောင့် နေထိုင်သူကို အနှောင့်အယှက်ဖြစ်စေခြင်းများ မရှိသလောက်ဖြစ်သည်။" }
    ],
    correctOptionId: 5,
    explanation: {
      titleMY: "ရှင်းလင်းချက် - 強度と剛性 (Strength and Stiffness)",
      reasonMY: "သံမဏိသည် 'ခိုင်မာမှု' (Strength) မြင့်မားသောကြောင့် ဖြတ်ပိုင်းအသေးဖြင့် သုံးနိုင်သော်လည်း၊ ဖြတ်ပိုင်းငယ်လွန်းပါက 'တောင့်တင်းမှု' (Stiffness/Rigidity) လျော့ကျသွားပြီး အလွန်အမင်း ကွေးညွှတ်ခြင်းနှင့် တုန်ခါမှုပြဿနာများ ဖြစ်ပေါ်တတ်သည်။",
      memoryTipMY: "Strength (ခံနိုင်ရည်) ပြည့်မီရုံနဲ့ Stiffness (မကွေးညွှတ်မှု) မလုံလောက်ရင် တုန်ခါတတ်ပါတယ်။"
    }
  },
  {
    id: "2026-1-10",
    questionJP: "<ruby>鉄骨部材<rt>てっこつぶざい</rt></ruby>の<ruby>座屈<rt>ざくつ</rt></ruby>に<ruby>関<rt>かん</rt></ruby>する<ruby>次<rt>つぎ</rt></ruby>の<ruby>記述<rt>きじゅつ</rt></ruby>のうち、<ruby>最<rt>もっと</rt></ruby>も<ruby>不適当<rt>ふてきとう</rt></ruby>なものはどれか。",
    questionMY: "Steel Member များ၏ Buckling (ခေါက်ချိုးကျိုးခြင်း) နှင့်ပတ်သက်၍ အသင့်လျော်ဆုံးမဟုတ်သည့်အချက်ကို ရွေးချယ်ပါ။",
    options: [
      { id: 1, textJP: "(1) <ruby>真<rt>ま</rt></ruby>っ<ruby>直<rt>す</rt></ruby>ぐな<ruby>細長<rt>ほそなが</rt></ruby>い<ruby>部材<rt>ぶざい</rt></ruby>に<ruby>中心圧縮力<rt>ちゅうしんあっしゅくりょく</rt></ruby>を<ruby>作用<rt>さよう</rt></ruby>させたとき、<ruby>細長<rt>ほそなが</rt></ruby>い<ruby>部材<rt>ぶざい</rt></ruby>が<ruby>曲<rt>ま</rt></ruby>がる<ruby>現象<rt>げんしょう</rt></ruby>を<ruby>曲<rt>ま</rt></ruby>げ<ruby>座屈<rt>ざくつ</rt></ruby>という。", textMY: "ဖြောင့်တန်းရှည်လျားသော Member တွင် Axial Compression သက်ရောက်၍ ကွေးသွားခြင်းကို Flexural Buckling ဟုခေါ်သည်။" },
      { id: 2, textJP: "(2) H<ruby>形鋼梁<rt>がたこうはり</rt></ruby>に<ruby>曲<rt>ま</rt></ruby>げモーメントを<ruby>作用<rt>さよう</rt></ruby>させたとき、<ruby>梁<rt>はり</rt></ruby>がねじれながら<ruby>横方向<rt>よこほうこう</rt></ruby>にたわむ<ruby>現象<rt>げんしょう</rt></ruby>を<ruby>横座屈<rt>よこざくつ</rt></ruby>という。<ruby>横座屈<rt>よこざくつ</rt></ruby>は<ruby>梁幅<rt>はりはば</rt></ruby>に<ruby>対<rt>たい</rt></ruby>する<ruby>梁<rt>はり</rt></ruby>せいの<ruby>大<rt>おお</rt></ruby>きなものほど<ruby>生<rt>しょう</rt></ruby>じやすい。", textMY: "H-beam တွင် Bending Moment ကြောင့် လိမ်ပြီး ဘေးဘက်သို့ ကွေးသွားခြင်းကို Lateral Buckling ဟုခေါ်သည်။ ၎င်းသည် Width နှင့်စာလျှင် Depth ကြီးသော Beam တွင် ပိုဖြစ်လွယ်သည်။" },
      { id: 3, textJP: "(3) <ruby>梁<rt>はり</rt></ruby>の<ruby>横座屈強度<rt>よこざくつきょうど</rt></ruby>を<ruby>高<rt>たか</rt></ruby>めるためには、<ruby>梁<rt>はり</rt></ruby>の<ruby>断面<rt>だんめん</rt></ruby>はそのままとし<ruby>鋼材<rt>こうざい</rt></ruby>の<ruby>種類<rt>しゅるい</rt></ruby>をより<ruby>高強度<rt>こうきょうど</rt></ruby>のものに<ruby>変更<rt>へんこう</rt></ruby>することが<ruby>最<rt>もっと</rt></ruby>も<ruby>効果的<rt>こうかてき</rt></ruby>である。", textMY: "Lateral Buckling Strength ကို မြှင့်တင်ရန် ဖြတ်ပိုင်းကိုမပြောင်းဘဲ သံမဏိအမျိုးအစားကို ပိုမိုခိုင်ခံ့သော (High-strength) အမျိုးအစားသို့ ပြောင်းလဲခြင်းသည် အထိရောက်ဆုံးဖြစ်သည်။" },
      { id: 4, textJP: "(4) <ruby>部材<rt>ぶざい</rt></ruby>を<ruby>構成<rt>こうせい</rt></ruby>する<ruby>板<rt>いた</rt></ruby>の<ruby>厚<rt>あつ</rt></ruby>さに<ruby>対<rt>たい</rt></ruby>して<ruby>幅<rt>はば</rt></ruby>が<ruby>大<rt>おお</rt></ruby>きすぎると、<ruby>板<rt>いた</rt></ruby>が<ruby>局部的<rt>きょくぶてき</rt></ruby>に<ruby>波打<rt>なみう</rt></ruby>つように<ruby>座屈<rt>ざくつ</rt></ruby>することがある。これを<ruby>局部座屈<rt>きょくぶざくつ</rt></ruby>という。", textMY: "အပြား၏ အထူထက် အကျယ်က များလွန်းပါက အပြားသည် လှိုင်းတွန့်သကဲ့သို့ Local Buckling ဖြစ်နိုင်သည်။" },
      { id: 5, textJP: "(5) <ruby>局部座屈<rt>きょくぶざくつ</rt></ruby>のしやすさを<ruby>表<rt>あらわ</rt></ruby>すパラメータとして、<ruby>板<rt>いた</rt></ruby>の<ruby>厚<rt>あつ</rt></ruby>さに<ruby>対<rt>たい</rt></ruby>する<ruby>板<rt>いた</rt></ruby>の<ruby>幅<rt>はば</rt></ruby>の<ruby>比率<rt>ひりつ</rt></ruby>が<ruby>一般的<rt>いっぱんてき</rt></ruby>に<ruby>用<rt>もち</rt></ruby>いられている。この<ruby>比率<rt>ひりつ</rt></ruby>を<ruby>幅厚比<rt>はばあつひ</rt></ruby>という。", textMY: "Local Buckling ဖြစ်နိုင်ခြေကို ဖော်ပြရန် Width-to-thickness Ratio (幅厚比) ကို အသုံးပြုသည်။" }
    ],
    correctOptionId: 3,
    explanation: {
      titleMY: "ရှင်းလင်းချက် - 横座屈 (Lateral Buckling)",
      reasonMY: "Lateral Buckling သည် Beam ၏ 'ဘေးတိုက်တောင့်တင်းမှု' (Lateral Stiffness) နည်းပါးခြင်းကြောင့် ဖြစ်ပေါ်သည်။ သံမဏိ၏ ခိုင်မာမှု (Strength) ကို တိုးမြှင့်ရုံဖြင့် Stiffness မြင့်မလာပါ။ Lateral Bracing (横補剛材) ထည့်ခြင်းကသာ အထိရောက်ဆုံးဖြစ်သည်။",
      memoryTipMY: "Buckling ကို တားဖို့ Strength ထက် Stiffness/Bracing က ပိုအရေးကြီးပါတယ်။"
    }
  },
  {
    id: "2026-1-11",
    questionJP: "<ruby>鉄骨構造<rt>てっこつこうぞう</rt></ruby>に<ruby>関<rt>かん</rt></ruby>する<ruby>次<rt>つぎ</rt></ruby>の<ruby>記述<rt>きじゅつ</rt></ruby>のうち、<ruby>最<rt>もっと</rt></ruby>も<ruby>不適当<rt>ふてきとう</rt></ruby>なものはどれか。",
    questionMY: "Steel Structure နှင့်ပတ်သက်၍ အောက်ပါဖော်ပြချက်များအနက် အသင့်လျော်ဆုံးမဟုတ်သည့်အချက်ကို ရွေးချယ်ပါ။",
    options: [
      { id: 1, textJP: "(1) <ruby>鉄骨構造物<rt>てっこつこうぞうぶつ</rt></ruby>の<ruby>構造材料<rt>こうぞうざいりょう</rt></ruby>として<ruby>使用<rt>しよう</rt></ruby>する<ruby>鋼<rt>はがね</rt></ruby>は、<ruby>他<rt>ほか</rt></ruby>の<ruby>構造材料<rt>こうぞうざいりょう</rt></ruby>である<ruby>木<rt>き</rt></ruby>やコンクリートと<ruby>比<rt>くら</rt></ruby>べて、<ruby>強度<rt>きょうど</rt></ruby>、<ruby>靭性<rt>じんせい</rt></ruby>が<ruby>非常<rt>ひじょう</rt></ruby>に<ruby>優<rt>すぐ</rt></ruby>れている。", textMY: "သံမဏိသည် သစ်သား သို့မဟုတ် ကွန်ကရစ်ထက် Strength နှင့် Toughness ပိုမိုကောင်းမွန်သည်။" },
      { id: 2, textJP: "(2) ラーメン<ruby>構造<rt>こうぞう</rt></ruby>における<ruby>梁<rt>はり</rt></ruby>フランジ<ruby>端部<rt>たんぶ</rt></ruby>には<ruby>大<rt>おお</rt></ruby>きな<ruby>応力<rt>おうりょく</rt></ruby>が<ruby>作用<rt>さよう</rt></ruby>するため、この<ruby>部分<rt>ぶぶん</rt></ruby>の<ruby>溶接<rt>ようせつ</rt></ruby>には<ruby>十分<rt>じゅうぶん</rt></ruby>な<ruby>品質管理<rt>ひんしつかんり</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>である。", textMY: "Rigid Frame တွင် Beam Flange အစွန်း၌ ကြီးမားသော Stress သက်ရောက်သဖြင့် ဂဟေဆက်ရာတွင် Quality Control အလွန်အရေးကြီးသည်။" },
      { id: 3, textJP: "(3) トラス<ruby>構造<rt>こうぞう</rt></ruby>は、<ruby>三角形<rt>さんかくけい</rt></ruby>を<ruby>基本形状<rt>きほんけいじょう</rt></ruby>として<ruby>部材<rt>ぶざい</rt></ruby>を<ruby>組<rt>く</rt></ruby>み<ruby>合<rt>あ</rt></ruby>わせ、<ruby>部材<rt>ぶざい</rt></ruby>の<ruby>軸方向力<rt>じくほうこうりょく</rt></ruby>で<ruby>外力<rt>がいりょく</rt></ruby>に<ruby>抵抗<rt>ていこう</rt></ruby>する<ruby>構造形式<rt>こうぞうけいしき</rt></ruby>である。<ruby>広<rt>ひろ</rt></ruby>い<ruby>無柱空間<rt>むちゅうくうかん</rt></ruby>を<ruby>実現<rt>じつげん</rt></ruby>するために<ruby>用<rt>もち</rt></ruby>いられるが、<ruby>部材数<rt>ぶざいすう</rt></ruby>が<ruby>多<rt>おお</rt></ruby>いため、<ruby>建物全体<rt>たてものぜんたい</rt></ruby>の<ruby>重量<rt>じゅうりょう</rt></ruby>がやや<ruby>大<rt>おお</rt></ruby>きくなるという<ruby>欠点<rt>けってん</rt></ruby>がある。", textMY: "Truss Structure သည် တိုင်လွတ်နေရာကျယ်များအတွက် သုံးသော်လည်း Member အရေအတွက်များသဖြင့် အဆောက်အဦတစ်ခုလုံး၏ အလေးချိန် ပိုလေးသွားသည့် အားနည်းချက်ရှိသည်။" },
      { id: 4, textJP: "(4) アーチ<ruby>構造<rt>こうぞう</rt></ruby>は、<ruby>上<rt>うえ</rt></ruby>に<ruby>凸<rt>とつ</rt></ruby>の<ruby>円弧<rt>えんこ</rt></ruby>のような<ruby>形状<rt>けいじょう</rt></ruby>を<ruby>持<rt>も</rt></ruby>つ<ruby>構造<rt>こうぞう</rt></ruby>で、<ruby>自重<rt>じちょう</rt></ruby>による<ruby>鉛直方向<rt>えんちょくほうこう</rt></ruby>の<ruby>力<rt>ちから</rt></ruby>に<ruby>対<rt>たい</rt></ruby>して<ruby>部材<rt>ぶざい</rt></ruby>の<ruby>軸方向圧縮力<rt>じくほうこうあっしゅくりょく</rt></ruby>で<ruby>抵抗<rt>ていこう</rt></ruby>する<ruby>構造形式<rt>こうぞうけいしき</rt></ruby>である。", textMY: "Arch Structure သည် အထက်သို့ခုံးသောပုံစံရှိပြီး ဒေါင်လိုက်ဝန်များကို Axial Compression ဖြင့် ခုခံသောပုံစံဖြစ်သည်။" },
      { id: 5, textJP: "(5) <ruby>制振構造<rt>せいしんこうぞう</rt></ruby>は、ダンパーと<ruby>呼<rt>よ</rt></ruby>ばれるエネルギー<ruby>吸収装置<rt>きゅうしゅうそうち</rt></ruby>を<ruby>建物内<rt>たてものない</rt></ruby>に<ruby>設置<rt>せっち</rt></ruby>することにより、<ruby>建物全体<rt>たてものぜんたい</rt></ruby>の<ruby>地震時<rt>じしんじ</rt></ruby>の<ruby>応答<rt>おうとう</rt></ruby>を<ruby>低減<rt>ていげん</rt></ruby>させる<ruby>構造<rt>こうぞう</rt></ruby>である。", textMY: "Vibration-control Structure (制振) သည် အဆောက်အဦအတွင်း Damper တပ်ဆင်၍ ငလျင်တုံ့ပြန်မှုကို လျှော့ချသောစနစ်ဖြစ်သည်။" }
    ],
    correctOptionId: 3,
    explanation: {
      titleMY: "ရှင်းလင်းချက် - トラス構造 (Truss Structure)",
      reasonMY: "Truss Structure သည် Member များတွင် Axial Force သာဖြစ်ပေါ်ပြီး Bending Moment မဖြစ်ပေါ်သောကြောင့် Member များကို သေးငယ်စွာ (Small Section) အသုံးပြုနိုင်သည်။ ထို့ကြောင့် အဆောက်အဦတစ်ခုလုံး 'ပေါ့ပါးသွားစေသည် (軽量化できる)' ဟူသောအချက်ကသာ အမှန်ဖြစ်သည်။ လေးသွားသည်ဆိုခြင်းမှာ မှားယွင်းပါသည်။",
      memoryTipMY: "Truss သုံးခြင်း၏ အဓိကအားသာချက်မှာ ပေါ့ပါးခြင်း (Lightweight) ဖြစ်သည်။"
    }
  },
  {
    id: "2026-1-12",
    questionJP: "<ruby>鉄骨部材<rt>てっこつぶざい</rt></ruby>の<ruby>座屈<rt>ざくつ</rt></ruby>に<ruby>関<rt>かん</rt></ruby>する<ruby>次<rt>つぎ</rt></ruby>の<ruby>記述<rt>きじゅつ</rt></ruby>のうち、<ruby>最<rt>もっと</rt></ruby>も<ruby>不適当<rt>ふてきとう</rt></ruby>なものはどれか。",
    questionMY: "Steel Member ၏ Buckling နှင့်ပတ်သက်၍ အောက်ပါဖော်ပြချက်များအနက် အသင့်လျော်ဆုံးမဟုတ်သည့်အချက်ကို ရွေးချယ်ပါ။",
    options: [
      { id: 1, textJP: "(1) <ruby>真<rt>ま</rt></ruby>っ<ruby>直<rt>す</rt></ruby>ぐな<ruby>細長<rt>ほそなが</rt></ruby>い<ruby>部材<rt>ぶざい</rt></ruby>に<ruby>中心圧縮力<rt>ちゅうしんあっしゅくりょく</rt></ruby>を<ruby>作用<rt>さよう</rt></ruby>させたとき、<ruby>部材<rt>ぶざい</rt></ruby>が<ruby>曲<rt>ま</rt></ruby>がる<ruby>現象<rt>げんしょう</rt></ruby>を<ruby>曲<rt>ま</rt></ruby>げ<ruby>座屈<rt>ざくつ</rt></ruby>という。", textMY: "ရှည်လျားသော Member တွင် Axial Compression ကြောင့် ကွေးသွားခြင်းကို Flexural Buckling ဟုခေါ်သည်။" },
      { id: 2, textJP: "(2) H<ruby>形鋼梁<rt>がたこうはり</rt></ruby>に<ruby>曲<rt>ま</rt></ruby>げモーメントを<ruby>作用<rt>さよう</rt></ruby>させたとき、<ruby>梁<rt>はり</rt></ruby>がねじれながら<ruby>横方向<rt>よこほうこう</rt></ruby>にたわむ<ruby>現象<rt>げんしょう</rt></ruby>を<ruby>横座屈<rt>よこざくつ</rt></ruby>という。", textMY: "H-beam တွင် Bending Moment ကြောင့် လိမ်ပြီး ဘေးဘက်ကွေးသွားခြင်းကို Lateral Buckling ဟုခေါ်သည်။" },
      { id: 3, textJP: "(3) <ruby>部材<rt>ぶざい</rt></ruby>を<ruby>構成<rt>こうせい</rt></ruby>する<ruby>板<rt>いた</rt></ruby>の<ruby>厚<rt>あつ</rt></ruby>さに<ruby>対<rt>たい</rt></ruby>して<ruby>幅<rt>はば</rt></ruby>が<ruby>大<rt>おお</rt></ruby>きすぎると、<ruby>板<rt>いた</rt></ruby>が<ruby>局部的<rt>きょくぶてき</rt></ruby>に<ruby>波打<rt>なみう</rt></ruby>つように<ruby>変形<rt>へんけい</rt></ruby>することがある。これを<ruby>局部座屈<rt>きょくぶざくつ</rt></ruby>という。", textMY: "အပြား၏ အထူထက် အကျယ်က များလွန်းပါက အပြားသည် လှိုင်းတွန့်သကဲ့သို့ Local Buckling ဖြစ်နိုင်သည်။" },
      { id: 4, textJP: "(4) <ruby>角形鋼管<rt>かくがたこうかん</rt></ruby>や<ruby>円形鋼管<rt>えんけいこうかん</rt></ruby>などの<ruby>閉鎖断面部材<rt>へいさだんめんぶざい</rt></ruby>は、<ruby>圧縮力<rt>あっしゅくりょく</rt></ruby>が<ruby>作用<rt>さよう</rt></ruby>しても<ruby>曲<rt>ま</rt></ruby>げ<ruby>座屈<rt>ざくつ</rt></ruby>が<ruby>発生<rt>はっせい</rt></ruby>することはないので、<ruby>特<rt>とく</rt></ruby>に<ruby>座屈<rt>ざくつ</rt></ruby>について<ruby>考慮<rt>こうりょ</rt></ruby>する<ruby>必要<rt>ひつよう</rt></ruby>はない。", textMY: "Box Column (角形鋼管) နှင့် Pipe (円形鋼管) ကဲ့သို့သော အပိတ်ဖြတ်ပိုင်း (Closed Section) များသည် Compression ကြောင့် Flexural Buckling လုံးဝမဖြစ်နိုင်သဖြင့် Buckling ကို ထည့်စဉ်းစားရန်မလိုပါ။" },
      { id: 5, textJP: "(5) <ruby>柱<rt>はしら</rt></ruby>の<ruby>曲<rt>ま</rt></ruby>げ<ruby>座屈強度<rt>ざくつきょうど</rt></ruby>を<ruby>高<rt>たか</rt></ruby>めるためには、<ruby>部材<rt>ぶざい</rt></ruby>の<ruby>中央付近<rt>ちゅうおうふきん</rt></ruby>に<ruby>横方向変位<rt>よこほうこうへんい</rt></ruby>を<ruby>拘束<rt>こうそく</rt></ruby>する<ruby>補剛材<rt>ほごうざい</rt></ruby>を<ruby>設<rt>もう</rt></ruby>けることが<ruby>効果的<rt>こうかてき</rt></ruby>である。", textMY: "Column ၏ Flexural Buckling Strength ကို မြှင့်တင်ရန် Member အလယ်တစ်ဝိုက်တွင် ဘေးတိုက်ရွေ့လျားမှုကို တားဆီးပေးသော Bracing တပ်ဆင်ခြင်းသည် အထိရောက်ဆုံးဖြစ်သည်။" }
    ],
    correctOptionId: 4,
    explanation: {
      titleMY: "ရှင်းလင်းချက် - 閉鎖断面部材の座屈",
      reasonMY: "Box Column သို့မဟုတ် Pipe များသည် လိမ်ခြင်း (Torsion) ကို ကောင်းစွာခံနိုင်ရည်ရှိ၍ 'Lateral Buckling (横座屈)' ဖြစ်နိုင်ခြေ နည်းပါးသော်လည်း၊ ရှည်လျားသွယ်လျပါက 'Flexural Buckling (曲げ座屈)' သည် သေချာပေါက် ဖြစ်ပေါ်နိုင်ပါသည်။ လုံးဝမဖြစ်နိုင်ဘူးဆိုခြင်းမှာ မှားယွင်းပါသည်။",
      memoryTipMY: "အပိတ် (Closed section) တွေက လိမ်မသွားပေမယ့်၊ ရှည်ရင်တော့ ကွေးပြီးကျိုး (Flexural Buckling) နိုင်ပါတယ်။"
    }
  },
  {
    id: "2026-1-13",
    questionJP: "<ruby>高力<rt>こうりょく</rt></ruby>ボルト<ruby>接合<rt>せつごう</rt></ruby>に<ruby>関<rt>かん</rt></ruby>する<ruby>次<rt>つぎ</rt></ruby>の<ruby>記述<rt>きじゅつ</rt></ruby>のうち、<ruby>最<rt>もっと</rt></ruby>も<ruby>不適当<rt>ふてきとう</rt></ruby>なものはどれか。",
    questionMY: "High-strength Bolt ဆက်သွယ်ခြင်းနှင့်ပတ်သက်၍ အောက်ပါဖော်ပြချက်များအနက် အသင့်လျော်ဆုံးမဟုတ်သည့်အချက်ကို ရွေးချယ်ပါ။",
    options: [
      { id: 1, textJP: "(1) <ruby>高力<rt>こうりょく</rt></ruby>ボルト<ruby>摩擦接合<rt>まさつせつごう</rt></ruby>とは、<ruby>孔<rt>あな</rt></ruby>をあけた<ruby>接合部<rt>せつごうぶ</rt></ruby>に<ruby>高力<rt>こうりょく</rt></ruby>ボルトを<ruby>差<rt>さ</rt></ruby>し<ruby>込<rt>こ</rt></ruby>み、<ruby>強<rt>つよ</rt></ruby>く<ruby>締<rt>し</rt></ruby>め<ruby>付<rt>つ</rt></ruby>けることによって<ruby>板<rt>いた</rt></ruby>の<ruby>接合面<rt>せつごうめん</rt></ruby>に<ruby>生<rt>しょう</rt></ruby>じる<ruby>摩擦抵抗力<rt>まさつていこうりょく</rt></ruby>で<ruby>力<rt>ちから</rt></ruby>を<ruby>伝達<rt>でんたつ</rt></ruby>する<ruby>接合<rt>せつごう</rt></ruby>の<ruby>方法<rt>ほうほう</rt></ruby>である。", textMY: "Friction-grip Connection (摩擦接合) သည် Bolt ကို အားပြင်းပြင်းဖြင့် ကျပ်လိုက်သောအခါ အပြားများကြားရှိ ပွတ်တိုက်အား (Friction) ဖြင့် အားကို လွှဲပြောင်းပေးသောနည်းလမ်းဖြစ်သည်။" },
      { id: 2, textJP: "(2) <ruby>高力<rt>こうりょく</rt></ruby>ボルト<ruby>引張接合<rt>ひっぱりせつごう</rt></ruby>にはスプリットティー<ruby>形式<rt>けいしき</rt></ruby>やエンドプレート<ruby>形式<rt>けいしき</rt></ruby>などがあり、<ruby>溶接<rt>ようせつ</rt></ruby>を<ruby>用<rt>もち</rt></ruby>いずに<ruby>柱梁仕口<rt>ちゅうりょうしぐち</rt></ruby>を<ruby>組<rt>く</rt></ruby>み<ruby>立<rt>た</rt></ruby>てることができる。", textMY: "Tension Connection (引張接合) တွင် Split-tee နှင့် End-plate ပုံစံများရှိပြီး၊ ဂဟေမသုံးဘဲ Column-beam Joint ကို တပ်ဆင်နိုင်သည်။" },
      { id: 3, textJP: "(3) <ruby>高力<rt>こうりょく</rt></ruby>ボルト<ruby>摩擦接合<rt>まさつせつごう</rt></ruby>の<ruby>摩擦面<rt>まさつめん</rt></ruby>は、<ruby>黒皮<rt>くろかわ</rt></ruby>を<ruby>除去<rt>じょきょ</rt></ruby>してから<ruby>自然<rt>しぜん</rt></ruby>または<ruby>薬剤<rt>やくざい</rt></ruby>により<ruby>発生<rt>はっせい</rt></ruby>い（<ruby>錆<rt>さび</rt></ruby>）させるか、もしくはブラスト<ruby>処理<rt>しょり</rt></ruby>をすることによって、0.45<ruby>以上<rt>いじょう</rt></ruby>のすべり<ruby>係数<rt>けいすう</rt></ruby>を<ruby>確保<rt>かくほ</rt></ruby>しなければならない。", textMY: "Friction-grip ၏ ပွတ်တိုက်မျက်နှာပြင်သည် Mill Scale (黒皮) ကိုဖယ်ရှားပြီး သဘာဝအတိုင်း သို့မဟုတ် ဆေးဖြင့် သံချေးတက်စေခြင်း သို့မဟုတ် Blast 처리 လုပ်ခြင်းဖြင့် Slip Coefficient 0.45 အထက် ရရှိရန် လုပ်ဆောင်ရမည်။" },
      { id: 4, textJP: "(4) トルシア<ruby>形高力<rt>がたこうりょく</rt></ruby>ボルトは、ピンテールの<ruby>破断<rt>はだん</rt></ruby>によって<ruby>必要<rt>ひつよう</rt></ruby>な<ruby>締付<rt>しめつ</rt></ruby>けトルクの<ruby>管理<rt>かんり</rt></ruby>を<ruby>可能<rt>かのう</rt></ruby>にしたものである。", textMY: "Torshear Type (トルシア形) Bolt သည် အမြီး (Pintail) ပြတ်သွားခြင်းဖြင့် လိုအပ်သော Torque ကို အလိုအလျောက် ထိန်းချုပ်ပေးသည်။" },
      { id: 5, textJP: "(5) <ruby>高力<rt>こうりょく</rt></ruby>ボルト<ruby>摩擦接合<rt>まさつせつごう</rt></ruby>の<ruby>摩擦面<rt>まさつめん</rt></ruby>に1.5mmの<ruby>肌<rt>はだ</rt></ruby>すきがある<ruby>場合<rt>ばあい</rt></ruby>、<ruby>板厚<rt>いたあつ</rt></ruby>の1/10<ruby>以下<rt>いか</rt></ruby>であればフィラープレートは<ruby>入<rt>い</rt></ruby>れなくてもよい。", textMY: "Friction-grip Joint တွင် 1.5mm ကွာဟချက် (肌すき) ရှိပါက၊ အပြားအထူ၏ 1/10 အောက်ဖြစ်လျှင် Filler Plate ထည့်စရာမလိုပါ။" }
    ],
    correctOptionId: 5,
    explanation: {
      titleMY: "ရှင်းလင်းချက် - 肌すき (Clearance/Gap)",
      reasonMY: "Friction-grip Connection တွင် အပြားများကြားရှိ ကွာဟချက် (肌すき) သည် 1.0mm ထက် ကျော်လွန်ပါက အပြားအထူ (板厚) နှင့် မသက်ဆိုင်ဘဲ မဖြစ်မနေ Filler Plate ထည့်သွင်းပေးရမည်။ 1.5mm ဖြစ်နေသဖြင့် မထည့်ဘဲမနေရပါ။",
      memoryTipMY: "ကွာဟချက် 1.0mm ကျော်ရင် Filler Plate မဖြစ်မနေ ထည့်ရမယ်။"
    }
  }
];
