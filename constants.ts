
import { AnyTest, TestType } from './types';

export const ICON_MAP: Record<string, string> = {
    [TestType.D2Attention]: '⏱️',
    [TestType.SpatialCubes]: '🎲',
    [TestType.PersonalityQuestionnaire]: '👤',
    [TestType.VerbalAnalogy]: '🧠',
    [TestType.VisualMemory]: '🖼️',
    [TestType.Stroop]: '🌈',
    [TestType.SentenceCompletion]: '📝',
    [TestType.Generalization]: '💡',
    [TestType.MathematicalEquation]: '🧮',
    [TestType.NumberSequence]: '🔢',
    [TestType.OperatorPlacement]: '➗',
    [TestType.RavenMatrices]: '🧩',
    [TestType.WechslerIntelligence]: '🎓',
    [TestType.SixteenPF]: '📊',
    [TestType.NeoBigFive]: '📈',
    [TestType.MBTI]: '🧭',
    [TestType.LuscherColor]: '🎨',
    [TestType.BeckDepression]: '😔',
    [TestType.ClockDrawing]: '⏰',
    [TestType.BentonVisual]: '👁️',
    [TestType.GenericQuestionnaire]: '👤'
};

export const ALL_TESTS_DATA: AnyTest[] = [
    {
        id: 'd2_attention',
        type: TestType.D2Attention,
        name: 'Test pozornosti (d2-R)',
        timeLimitMinutes: 2,
        gridSize: { rows: 8, cols: 20 },
        targetChar: 'd̈',
        distractors: ['d', 'p', 'b', 'q', 'ď', 'd̂'],
        targetPercentage: 15,
        description: `<strong>Co to je:</strong> Test měření rychlosti a přesnosti zpracování informací, selektivní pozornosti a koncentrace.<br><strong>Jak probíhá:</strong> Úkolem je v řadě znaků co nejrychleji najít a označit specifický znak (obvykle písmeno 'd' se dvěma čárkami). Test je časově omezený.<br><strong>Tipy:</strong> Pracujte systematicky zleva doprava, řádek po řádku. Udržujte konstantní tempo. Nenechte se rozptýlit chybami, prostě pokračujte dál.`
    },
    {
        id: 'spatial_cubes',
        type: TestType.SpatialCubes,
        name: 'Prostorová představivost',
        timeLimitMinutes: 10,
        questions: [
            { id: 1, unfolded: {t: 'A', l: 'B', c: 'C', r: 'D', b: 'E'}, options: [{t: 'A', f: 'C', r: 'D'}, {t: 'B', f: 'C', r: 'A'}, {t: 'E', f: 'C', r: 'B'}, {t: 'A', f: 'B', r: 'E'} ], correct: 0 },
            { id: 2, unfolded: {t: '1', l: '2', c: '3', r: '4', b: '5'}, options: [{t: '2', f: '5', r: '4'}, {t: '1', f: '3', r: '4'}, {t: '5', f: '3', r: '2'}, {t: '1', f: '2', r: '3'}], correct: 1 },
            { id: 3, unfolded: { t: 'X', l: 'Y', c: 'Z', r: 'W', b: 'V' }, options: [ { t: 'X', f: 'Z', r: 'W' }, { t: 'Y', f: 'Z', r: 'X' }, { t: 'V', f: 'Z', r: 'Y' }, { t: 'X', f: 'Y', r: 'V' } ], correct: 0 }
        ],
        description: `<strong>Co to je:</strong> Komplexní test pro měření různých složek inteligence. Skládá se z několika subtestů.<br><strong>Subtesty:</strong> Doplňování vět, hledání analogií, vyloučení slova, zobecňování, aritmetické úlohy, číselné řady, prostorová představivost (krychle), a paměťové úlohy.<br><strong>Tipy:</strong> Seznamte se s typy úloh předem. Pokud si nejste jisti, zkuste odhadnout, ale nezdržujte se příliš dlouho u jedné otázky.`
    },
    {
        id: 'personality_questionnaire',
        type: TestType.PersonalityQuestionnaire,
        name: 'Osobnostní dotazník',
        timeLimitMinutes: 15,
        questions: [
            { id: 1, statement: "Rád/a trávím čas ve velké skupině lidí.", category: "extraversion" },
            { id: 2, statement: "Důkladně plánujem dopředu, než abych věci nechával/a náhodě.", category: "conscientiousness" },
            { id: 3, statement: "Často se cítím napjatý/á a nervózní.", category: "neuroticism" },
            { id: 4, statement: "Je pro mě důležité, aby se mnou ostatní souhlasili.", category: "agreeableness" },
            { id: 5, statement: "Snadno se nechám vyvést z míry.", category: "neuroticism" },
            { id: 6, statement: "Rád/a přebírám vedení ve skupinových aktivitách.", category: "extraversion" },
            { id: 7, statement: "Své pocity si nechávám spíše pro sebe.", category: "introversion" },
            { id: 8, statement: "Jsem spíše tichý/á a zdrženlivý/á.", category: "introversion" },
            { id: 9, statement: "Rád/a řeším složité problémy.", category: "openness" },
            { id: 10, statement: "Jsem si vědom/a svých emocí a umím je ovládat.", category: "emotional_stability" }
        ],
        description: `<strong>Co to je:</strong> Rozsáhlý osobnostní dotazník, který hodnotí osobnostní rysy a psychopatologické tendence.<br><strong>Jak funguje:</strong> Skládá se ze stovek výroků, na které odpovídáte "souhlasím" / "nesouhlasím". Test obsahuje lži-skóre pro odhalení neupřímnosti.<br><strong>Důležité:</strong> Odpovídejte upřímně a podle prvního dojmu. Nesnažte se stylizovat do "ideálního" profilu, test to obvykle odhalí.`
    },
    {
        id: 'verbal_analogy',
        type: TestType.VerbalAnalogy,
        name: 'Slovní analogie',
        timeLimitMinutes: 7,
        questions: [
            { id: 1, analogy_part1: "nemoc : zdraví", analogy_part2_stem: "den : ", options: ["slunce", "poledne", "noc", "světlo", "tma"], correct_option: "noc" },
            { id: 2, analogy_part1: "pes : štěká", analogy_part2_stem: "kočka : ", options: ["štěká", "mňouká", "vrčí", "přede", "syčí"], correct_option: "mňouká" },
            { id: 3, analogy_part1: "voda : žízeň", analogy_part2_stem: "jídlo : ", options: ["hlad", "spánek", "radost", "teplo", "zima"], correct_option: "hlad" },
            { id: 4, analogy_part1: "léto : teplo", analogy_part2_stem: "zima : ", options: ["sníh", "mráz", "chlad", "led", "vítr"], correct_option: "chlad" },
            { id: 5, analogy_part1: "auto : silnice", analogy_part2_stem: "loď : ", options: ["vzduch", "přístav", "řeka", "voda", "most"], correct_option: "voda" }
        ],
        description: `<strong>Co to je:</strong> Test měřící schopnost rozpoznávat vztahy mezi pojmy a aplikovat je na jiné. Klíčový pro verbální inteligenci.<br><strong>Jak probíhá:</strong> Je vám dána dvojice slov s určitým vztahem a třetí slovo. Musíte najít čtvrté slovo, které má stejný vztah ke třetímu slovu jako první dvojice.<br><strong>Tipy:</strong> Nejprve určete vztah mezi první dvojicí slov. Může to být synonymum, antonymum, část-celek, příčina-následek atd. Poté aplikujte stejný vztah na třetí slovo.`
    },
    {
        id: 'visual_memory',
        type: TestType.VisualMemory,
        name: 'Vizuální paměť',
        timeLimitMinutes: 8,
        memorizeTimeSeconds: 3,
        questions: [
            { id: 1, pattern: [1, 0, 1, 0, 1, 0, 1, 0, 1], options: [ [1, 0, 1, 0, 1, 0, 1, 0, 1], [0, 1, 0, 1, 0, 1, 0, 1, 0], [1, 1, 0, 0, 1, 1, 0, 0, 1], [0, 0, 1, 1, 0, 0, 1, 1, 0] ], correct: 0 },
            { id: 2, pattern: [1, 1, 0, 1, 0, 0, 0, 0, 0], options: [ [0, 1, 1, 0, 1, 0, 0, 0, 0], [1, 1, 0, 1, 0, 0, 0, 0, 0], [1, 0, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 0, 1, 0, 0] ], correct: 1 },
            { id: 3, pattern: [0, 1, 0, 1, 1, 1, 0, 1, 0], options: [ [0, 1, 0, 1, 1, 1, 0, 1, 0], [1, 0, 1, 0, 1, 0, 1, 0, 1], [0, 0, 1, 1, 1, 1, 1, 0, 0], [1, 1, 1, 0, 0, 0, 1, 1, 1] ], correct: 0 }
        ],
        description: `<strong>Co to je:</strong> Test měřící schopnost krátkodobé vizuální paměti a reprodukce vizuálních informací.<br><strong>Jak probíhá:</strong> Na krátkou dobu se vám zobrazí geometrický vzor nebo obrázek, který si máte zapamatovat. Poté máte za úkol tento vzor reprodukovat nebo vybrat z několika možností.<br><strong>Tipy:</strong> Snažte se vnímat vzor jako celek, ale zároveň si všímejte klíčových detailů a jejich vzájemné polohy. Představte si vzor v mysli.`
    },
    {
        id: 'stroop_test',
        type: TestType.Stroop,
        name: 'Stroopův test',
        timeLimitMinutes: 3,
        questions: [
            { id: 1, word: "ČERVENÁ", color: "blue" }, { id: 2, word: "MODRÁ", color: "red" }, { id: 3, word: "ZELENÁ", color: "yellow" },
            { id: 4, word: "ŽLUTÁ", color: "green" }, { id: 5, word: "MODRÁ", color: "green" }, { id: 6, word: "ČERVENÁ", color: "yellow" },
            { id: 7, word: "ZELENÁ", color: "red" }, { id: 8, word: "ŽLUTÁ", color: "blue" }, { id: 9, word: "ČERVENÁ", color: "green" },
            { id: 10, word: "MODRÁ", color: "yellow" }
        ],
        description: `<strong>Co to je:</strong> Neuropsychologický test měřící selektivní pozornost, rychlost zpracování informací a schopnost potlačit rušivé vlivy.<br><strong>Jak probíhá:</strong> Například máte pojmenovat barvu inkoustu, kterým je napsáno slovo, přičemž slovo samotné je název jiné barvy (např. slovo "MODRÁ" napsané červeným inkoustem).<br><strong>Tipy:</strong> Soustřeďte se pouze na barvu inkoustu a ignorujte význam slova.`
    },
    {
        id: 'sentence_completion',
        type: TestType.SentenceCompletion,
        name: 'Doplňování vět',
        timeLimitMinutes: 6,
        questions: [
            { id: 1, sentence_template: "Každý závod musí mít ...", options: ["pořadatele", "diváky", "přestávku", "cíl", "občerstvení"], correct_option: "cíl" },
            { id: 2, sentence_template: "Ptáci na jaře ... hnízda.", options: ["staví", "jedí", "hledají", "přiletí", "spí"], correct_option: "staví" },
            { id: 3, sentence_template: "Děti si rády hrají na ... hřišti.", options: ["velkém", "malém", "školním", "dětském", "svém"], correct_option: "dětském" },
        ],
        description: `<strong>Co to je:</strong> Test měřící slovní zásobu, logické myšlení a schopnost dokončovat myšlenky.<br><strong>Jak probíhá:</strong> Dostanete větu, ve které chybí jedno slovo, a několik možností, jak ji doplnit.<br><strong>Tipy:</strong> Přečtěte si celou větu a zvažte význam každé možnosti.`
    },
    {
        id: 'generalization',
        type: TestType.Generalization,
        name: 'Zobecňování',
        timeLimitMinutes: 6,
        questions: [
            { id: 1, words: ["házená", "běh", "atletika", "fotbal", "box", "plavání"], options: ["Míčové sporty", "Individuální sporty", "Vodní sporty", "Bojové sporty"], correct_concept: "Míčové sporty", correct_pair_indices: [0, 3] },
            { id: 2, words: ["jablko", "hruška", "zelenina", "mrkev", "banán", "citron"], options: ["Zelenina", "Ovoce", "Koření", "Luštěniny"], correct_concept: "Ovoce", correct_pair_indices: [0, 1] },
        ],
        description: `<strong>Co to je:</strong> Test měřící schopnost abstraktního myšlení a kategorizace.<br><strong>Jak probíhá:</strong> Dostanete sadu slov a vaším úkolem je najít, co mají společného.<br><strong>Tipy:</strong> Hledejte nejkonkrétnější společnou vlastnost.`
    },
    {
        id: 'mathematical_equation',
        type: TestType.MathematicalEquation,
        name: 'Matematické úlohy',
        timeLimitMinutes: 9,
        questions: [
            { id: 1, question: "12 × 12 = B × 2", options: [16, 9, 72, 95, 111], correct_answer: 72 },
            { id: 2, question: "25 + A = 50 - 15", options: [5, 10, 15, 20, 25], correct_answer: 10 },
        ],
        description: `<strong>Co to je:</strong> Test měřící numerické schopnosti a logické uvažování.<br><strong>Jak probíhá:</strong> Zobrazí se vám matematická rovnice s neznámou, kterou máte vypočítat.<br><strong>Tipy:</strong> Dodržujte pořadí operací.`
    },
    {
        id: 'number_sequence',
        type: TestType.NumberSequence,
        name: 'Číselné řady',
        timeLimitMinutes: 9,
        questions: [
            { id: 1, sequence: [3, 7, 10, 5, 9, 12, 7], options: [8, 11, 13, 16, 24], correct_next_number: 11, rule_description: "Pravidlo: střídavě +4, +3, -5." },
            { id: 2, sequence: [1, 2, 4, 7, 11, 16, 22], options: [28, 29, 30, 31, 32], correct_next_number: 29, rule_description: "Pravidlo: Přičítá se o 1 více než předchozí číslo (+1, +2, +3,...)." },
        ],
        description: `<strong>Co to je:</strong> Test schopnosti rozpoznávat vzorce v číselných řadách.<br><strong>Jak probíhá:</strong> Máte odhalit pravidlo a doplnit chybějící číslo.<br><strong>Tipy:</strong> Hledejte rozdíly, násobky, nebo kombinace operací.`
    },
    {
        id: 'operator_placement',
        type: TestType.OperatorPlacement,
        name: 'Početní znaménka',
        timeLimitMinutes: 8,
        questions: [
            { id: 1, equation_template: "(29 ? 8) ? 3 = 7", correct_operators: ["-", "/"] },
            { id: 2, equation_template: "10 ? 5 ? 2 = 4", correct_operators: ["/", "+"] },
        ],
        description: `<strong>Co to je:</strong> Test logického myšlení, kde doplňujete matematická znaménka.<br><strong>Jak probíhá:</strong> Doplňte +, -, *, / do rovnice, aby platila.<br><strong>Tipy:</strong> Zvažte pořadí operací.`
    },
    {
        id: 'raven_matrices',
        type: TestType.RavenMatrices,
        name: 'Ravenovy progresivní matrice',
        timeLimitMinutes: 12,
        questions: [
            { id: 1, matrix: [['●', '○', '●'], ['○', '●', '○'], ['●', '○', '?']], options: ['●', '○', '◐', '◑'], correct: 0 },
            { id: 2, matrix: [['▲', '▲▲', '▲▲▲'], ['●', '●●', '●●●'], ['■', '■■', '?']], options: ['■■■', '■', '■■', '■■■■'], correct: 0 },
        ],
        description: `<strong>Co to je:</strong> Neverbální test inteligence měřící abstraktní uvažování.<br><strong>Jak probíhá:</strong> Úkolem je doplnit chybějící část vzoru v matici obrázků.<br><strong>Tipy:</strong> Hledejte pravidla jako rotace, přidávání/odebírání prvků.`
    },
    {
        id: 'wechsler_intelligence',
        type: TestType.WechslerIntelligence,
        name: 'Wechslerovy škály inteligence',
        timeLimitMinutes: 20,
        questions: [
            { id: 1, type: 'vocabulary', question: 'Co znamená slovo "altruismus"?', options: ['Sobeckost a egoismu', 'Nezištná pomoc druhým', 'Politický názor', 'Druh umění'], correct_answer: 'Nezištná pomoc druhým' },
            { id: 2, type: 'arithmetic', question: 'Pokud má Jan 15 jablek a dá 3 svým přátelům, kolik jablek mu zůstane?', options: [12, 18, 9, 6], correct_answer: 12 },
        ],
        description: `<strong>Co to je:</strong> Komplexní test inteligence měřící verbální i performační IQ.<br><strong>Jak probíhá:</strong> Skládá se z mnoha subtestů (slovník, aritmetika, ...).<br><strong>Tipy:</strong> Testuje široké spektrum schopností.`
    },
    {
        id: '16pf_personality',
        type: TestType.SixteenPF,
        name: '16PF Osobnostní dotazník',
        timeLimitMinutes: 25,
        questions: [
            { id: 1, statement: 'Obvykle se cítím plný energie a nadšení.', factor: 'surgency' },
            { id: 2, statement: 'Rád/a pracujem s čísly a statistikami.', factor: 'intelligence' },
        ],
        description: `<strong>Co to je:</strong> Osobnostní dotazník, který měří 16 základních osobnostních rysů.<br><strong>Jak funguje:</strong> Odpovídáte na výroky o vašem chování.<br><strong>Důležité:</strong> Odpovídejte upřímně.`
    },
    {
        id: 'neo_big_five',
        type: TestType.NeoBigFive,
        name: 'NEO-PI-R (Velká pětka)',
        timeLimitMinutes: 30,
        questions: [
            { id: 1, statement: 'Jsem plný/á nápadů.', factor: 'openness' },
            { id: 2, statement: 'Jsem vždy připraven/a na akci.', factor: 'conscientiousness' },
        ],
        description: `<strong>Co to je:</strong> Osobnostní dotazník založený na modelu "Velké pětky".<br><strong>Jak funguje:</strong> Hodnotíte výroky na škále souhlasu/nesouhlasu.<br><strong>Tipy:</strong> Buďte upřímní.`
    },
    {
        id: 'mbti_personality',
        type: TestType.MBTI,
        name: 'MBTI Osobnostní typy',
        timeLimitMinutes: 20,
        questions: [
            { id: 1, statement: 'Při řešení problémů preferujete logickou analýzu a fakta před intuicí a celkovým dojmem.', dimension: 'thinking_feeling' },
            { id: 2, statement: 'Energii čerpáte především z interakce s lidmi, nikoli z času stráveného o samotě.', dimension: 'extraversion_introversion' },
        ],
        description: `<strong>Co to je:</strong> Dotazník, který klasifikuje osobnost do 16 typů.<br><strong>Jak funguje:</strong> Odpovídáte na otázky o vašich preferencích.<br><strong>Důležité:</strong> Nástroj pro sebepoznání.`
    },
    {
        id: 'luscher_color',
        type: TestType.LuscherColor,
        name: 'Luscherův barevný test',
        timeLimitMinutes: 10,
        colors: [
            { name: 'Modrá', value: '#0000FF', meaning: 'Klid, harmonie, spokojenost' }, { name: 'Zelená', value: '#008000', meaning: 'Vytrvalost, sebevědomí, pýcha' },
            { name: 'Červená', value: '#FF0000', meaning: 'Energie, vůle, touha' }, { name: 'Žlutá', value: '#FFFF00', meaning: 'Aktivita, spontánnost, expanzivnost' },
        ],
        description: `<strong>Co to je:</strong> Test analyzující emoční stav na základě preferencí barev.<br><strong>Jak probíhá:</strong> Seřadíte barvy od nejpříjemnější po nejméně příjemnou.<br><strong>Důležité:</strong> Jde o preferenci v daný moment.`
    },
    {
        id: 'beck_depression',
        type: TestType.BeckDepression,
        name: 'Beck Depression Inventory',
        timeLimitMinutes: 15,
        questions: [
            { id: 1, question: 'Smutek', options: ['Necítím se smutný/á', 'Cítím se smutný/á', 'Jsem stále smutný/á a nemohu se z toho dostat', 'Jsem tak smutný/á nebo nešťastný/á, že to nemohu vydržet'] },
            { id: 2, question: 'Pesimismus', options: ['Nejsem ohledně své budoucnosti obzvlášť pesimistický/á', 'Cítím se pesimisticky ohledně budoucnosti', 'Cítím, že nemám na co se těšit', 'Cítím, že budoucnost je beznadějná a že se věci nemohou zlepšit'] },
        ],
        description: `<strong>Co to je:</strong> Dotazník pro screening depresivních symptomů.<br><strong>Jak funguje:</strong> Skládá se z 21 otázek týkajících se symptomů deprese.<br><strong>Důležité:</strong> Pouze screening, nenahrazuje diagnózu.`
    },
    {
        id: 'clock_drawing',
        type: TestType.ClockDrawing,
        name: 'Test hodin',
        timeLimitMinutes: 5,
        instructions: 'Nakreslete ciferník hodin a nastavte ručičky na čas 10:10',
        scoring_criteria: ['Kruhový tvar ciferníku', 'Správné umístění čísel 1-12', 'Správná délka ručiček', 'Správné umístění ručiček na 10:10'],
        description: `<strong>Co to je:</strong> Neuropsychologický test pro screening kognitivních funkcí.<br><strong>Jak probíhá:</strong> Úkolem je nakreslit ciferník hodin a umístit ručičky na určitý čas.<br><strong>Důležité:</strong> Hodnotí se přesnost kresby.`
    },
    {
        id: 'benton_visual',
        type: TestType.BentonVisual,
        name: 'Bentonův vizuální retenční test',
        timeLimitMinutes: 10,
        memorizeTimeSeconds: 10,
        questions: [
            { id: 1, shapes: [ { type: 'circle', x: 50, y: 50, size: 30 }, { type: 'square', x: 150, y: 50, size: 25 }, { type: 'triangle', x: 100, y: 120, size: 20 } ] },
            { id: 2, shapes: [ { type: 'diamond', x: 75, y: 75, size: 35 }, { type: 'circle', x: 175, y: 75, size: 20 }, { type: 'line', x: 0, y: 0, size: 0, x1: 50, y1: 150, x2: 200, y2: 150 } ] }
        ],
        description: `<strong>Co to je:</strong> Test měřící vizuální paměť a percepci.<br><strong>Jak probíhá:</strong> Prohlédnete si obrázek a poté ho nakreslíte zpaměti.<br><strong>Tipy:</strong> Zapamatujte si detaily a uspořádání.`
    }
];