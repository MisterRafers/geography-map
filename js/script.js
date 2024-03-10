var points = [[1020, 105], [1140, 235]];
//var info = [["Россия", "Государство в Восточной Европе и Северной Азии.", "https://www.google.com/maps/place/Россия,+Москва"], ["Китай", "Китай (официальное название — Китайская Народная Республика (КНР)) — государство в Восточной Азии. Занимает 4-е место в мире по территории среди государств (9 598 962 км²), уступая России, Канаде и США, а по численности населения — 1 411 750 000 жителей (без Тайваня, Гонконга и Макао). Уровень урбанизации равен 65 %", "https://www.google.com/maps/place/Китай,+Пекин"]];
let region = 0;
let prop_idx = 0;
let dost = 0;

var questions = [];
var questionsAnswered = new Map();
let questionID = 1;
let questionsCount = 0;
let rightAnswered = 0;

var info = [
    ["Центральный", "Москва", 650200, 40240256, "213/moscow", "Умеренно-континентальный"],
    ["Северо-Западный", "Санкт-Петербург", 1687000, 13867347, "2/saint-petersburg", "Умеренно-континентальный"],
    ["Приволжский", "Нижний Новгород", 1038000, 28683247, "47/nizhny-novgorod", "Меняется с севера на юг, от умеренно континентального до континентального."],
    ["Южный", "Ростов-на-Дону", 447900, 16642052, "39/rostov-na-donu/", "Мягкий и умеренный"],
    ["Северо-Кавказский", "Пятигорск", 170400, 10205730, "11067/pyatigorsk", "Умеренно-континентальный"],
    ["Уральский", "Екатеринбург", 1818500, 12259126, "54/yekaterinburg", "Умеренно-континентальный"],
    ["Сибирский", "Новосибирск", 4361802, 16645802, "65/novosibirsk", "Резко-континентальный с суровыми зимами и коротким жарким летом."],
    ["Дальневосточный", "Владивосток", 331, 597240, "75/vladivostok", "В северной части климат резко континентальный, в южной части климат муссонный."]
];

const dostoprimechatelnosti = [
    ["Русский мост", "Маяк Эгершельд", "Золотой Мост"],
    ["Храм Спаса на Крови", "Большой Петергофский дворец", "Музейный комплекс \"Государственный музей-памятник\""],
    ["Казанский Кремль", "Мечеть Кул Шариф", "Улица Баумана (Казанский Арбат)"],
    ["Мамаев Kурган", "Скульптура Родина-Мать зовет", "Набережная Геленджика"],
    ["Нарзанная Галерея", "Озеро Провал", "Сердце Чечни"],
    ["Смотровая площадка бизнес центра \"Высоцкий\"", "Храм на Крови", "Кировка - Челябинский Арбат"],
    ["Озеро Байкал", "Академгородок", "Музей-заповедник \«Томская писаница\»"],
    ["Вулкан Тятя", "Долина гейзеров", "Китовая аллея Чукотки"]
];
const dostoprimechatelnostiLinks = [
    [
        "https://yandex.ru/maps/org/russkiy_most/47591794946/panorama",
        "https://yandex.ru/maps/org/mayak_tokarevskogo/187563148606/panorama/",
        "https://yandex.ru/maps/org/zolotoy_most/99501102890/panorama/"],
    [
        "https://yandex.ru/maps/org/khram_voskreseniya_khristova_spas_na_krovi/203189565021/panorama/",
        "https://yandex.ru/maps/org/bolshoy_petergofskiy_dvorets/66250375577/panorama/",
        "https://yandex.ru/maps/org/isaakiyevskiy_sobor/157776064978/panorama"
    ],
    [
        "https://yandex.ru/maps/org/kazanskiy_kreml/95813866834/panorama/",
        "https://yandex.ru/maps/org/mechet_kul_sharif/1009467292/panorama/",
        "https://yandex.ru/maps/65/novosibirsk/geo/ulitsa_baumana/11155613/?ll=83.078480%2C54.977354&panorama%5Bdirection%5D=33.031772%2C1.000000&panorama%5Bfull%5D=true&panorama%5Bpoint%5D=83.078426%2C54.977349&panorama%5Bspan%5D=114.409883%2C60.000000&tab=panorama&z=16"
    ],
    [
        "https://yandex.ru/maps/org/mamayev_kurgan/192297114489/panorama/",
        "https://yandex.ru/maps/org/rodina_mat_zovyot_/33516880554/panorama/",
        "https://yandex.ru/maps/org/naberezhnaya_gelendzhika/1874925999/panorama/"
    ],
    [
        "https://yandex.ru/maps/org/narzannaya_galereya/191783022978/panorama/",
        "https://yandex.ru/maps/org/proval/132756742129/panorama/",
        "https://yandex.ru/maps/org/tsentralnaya_mechet_serdtse_chechni_imeni_akhmata_kadyrova/1308618694/panorama/"
    ],
    [
        "https://yandex.ru/maps/org/bts_vysotskiy/1016292298/panorama/",
        "https://yandex.ru/maps/org/khram_voskreseniya_khristova_spas_na_krovi/203189565021/panorama/",
        "https://yandex.ru/maps/56/chelyabinsk/geo/ulitsa_kirova/8012089/?ll=61.400133%2C55.168923&panorama%5Bdirection%5D=170.373988%2C1.000000&panorama%5Bfull%5D=true&panorama%5Bpoint%5D=61.400086%2C55.168998&panorama%5Bspan%5D=114.409883%2C60.000000&tab=panorama&z=14"
    ],
    [
        "https://yandex.ru/maps/225/russia/geo/ozero_baykal/189898352/?l=stv%2Csta&ll=107.772330%2C53.367892&panorama%5Bair%5D=true&panorama%5Bdirection%5D=187.607720%2C0.000000&panorama%5Bfull%5D=true&panorama%5Bid%5D=1716408251_697462194_23_1654354928&panorama%5Bpoint%5D=107.735356%2C53.394061&panorama%5Bspan%5D=114.409883%2C60.000000&z=9.6",
        "https://yandex.ru/maps/org/tekhnopark_novosibirskogo_akademgorodka/1571180872/panorama/",
        "https://yandex.ru/maps/org/novosibirskiy_teatr_opery_i_baleta/1062011780/panorama/" // панорамы нету -_-
    ],
    [
        "https://yandex.ru/maps/org/vulkan_tyatya_1819_m/30823671001",
        "https://yandex.ru/maps/org/dolina_geyzerov/1797314379/panorama/",
        "https://yandex.ru/maps/org/kitovaya_alleya/101155176338/"
    ]
];


const interestFacts = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    [""],
    [""],
    [""],
    [""],
    [""]
];

const facts = [
    "Россия – самая большая страна мира, её площадь 17 075 400 квадратных километров. Она больше США в 1,8 раз. Площадь России приблизительно равна площади поверхности планеты Плутон.",
    "В России проживает >190 различных народов.",
    "В Санкт‑Петербурге находится самое глубокое в мире метро.",
    "В России находится самый большой в мире действующий вулкан – Ключевская Сопка. Его высота 4 километра 850 метров. Он выбрасывает столбы пепла на восемь километров вверх. С каждым извержением он становится всё выше. Извергается вулкан Ключевская Сопка на протяжении последних 7 тысяч лет.",
    "Самым старым христианским храмом на территории России считается древний храм Тхаба-Ерды, расположенный в Ингушетии, в Джейрахском районе, между аулами Хайрах и Пуй. Он был построен VIII-IX веках. Три старейших из ныне действующих храмов находятся в посёлке Нижний Архыз в Карачаево-Черкессии. Построены они были в X-м веке.",
    "Сибирское озеро Байкал – самое глубокое озеро в мире и самый крупный источник пресной воды на планете. В Байкале 23 кубических километра воды. Все крупнейшие реки мира – Волга, Дон, Днепр, Енисей, Урал, Обь, Ганг, Ориноко, Амазонка, Темза, Сена и Одер – должны течь почти год, чтобы заполнить бассейн, равный по объёму озеру Байкал.",
    "Россия – единственное государство, территория которого омывается двенадцатью морями.",
    "Россию отделяют от Америки 4 километра. Это расстояние между островом Ратманова (Россия) и островом Крузенштерна (США) в Беринговом проливе.",
    "От Москвы до Чикаго ближе, чем от Чикаго до Рио-де-Жанейро.",
    "Урал – самые старые горы в мире. Расположенная в Кусинском районе у деревни Александровка гора Карандаш возникла 4, 2 миллиарда лет назад. Исторические названия Уральских гор – Большой Камень, Сибирский Камень, Земной Пояс, Поясной Камень. Когда-то Уральские горы были очень высокими, но теперь от прежних гор остались только основания.",
    "В Москве есть 7 абсолютно одинаковых высотных зданий: 2 отеля, 2 административных здания, 2 жилых дома и университет. По-английски этот ансамбль называют Семь Сестёр, а по-русски просто сталинскими высотками. Стиль, в котором построены высотки, называется сталинский ампир.",
    "Московский Кремль – самая большая в мире средневековая крепость.",
    "Полная длина кремлевских стен составляет 2235 метров.",
    "В Москве есть большой фонтан, из которого бьёт питьевая вода. Фонтан входит в архитектурную группу «Александр и Натали» со скульптурной композицией Пушкина и Гончаровой в изящной ротонде.",
    "Площадь Сибири – 9 миллионов 734,3 тысячи квадратных километров, что составляет 9% земной суши."
];

var cardEnabled = false;

var args = [];

function getCheckedInput() {
    return document.querySelector('input[type=radio]:checked') != null ? document.getElementById(document.querySelector('input[type=radio]:checked').id + 'l').innerText : '';
}

document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id == 'modal') document.getElementById('close').click();
});

for (let i = 0; i < document.getElementsByClassName('hoverable').length; i++) {
    document.getElementsByClassName('hoverable')[i].addEventListener('long-press', (e) => {
        e.preventDefault();

        if (!document.getElementsByClassName('hoverable')[i].classList.contains('selected')) {
            addSelected(document.getElementsByClassName('hoverable')[i]);
            return;
        }
        remSelected(document.getElementsByClassName('hoverable')[i]);
    });
    document.getElementsByClassName('hoverable')[i].addEventListener('click', (e) => {
        //modalC(document.getElementsByClassName('hoverable')[i].classList[0]);
        //console.log(e);
        if (e.shiftKey && !document.getElementsByClassName('hoverable')[i].classList.contains('selected')) {
            addSelected(document.getElementsByClassName('hoverable')[i]);
            return;
        }
        // document.getElementById('sendDiv').style.
        if (document.getElementsByClassName('hoverable')[i].classList.contains('selected')) {
            if (e.shiftKey)
                remSelected(document.getElementsByClassName('hoverable')[i]);
            else
                Array.from(document.getElementsByClassName('selected')).forEach((val) => {
                    remSelected(val);
                });
            return;
        }
        document.body.style.setProperty('--modal-margin', '15vh');
        document.getElementById('modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
        let idx = parseInt(document.getElementsByClassName('hoverable')[i].classList[0]) - 1;

        document.getElementById('modal-img').src = 'imgs/map/' + (idx + 1) + '_.png';
        document.querySelector('#modal #bigFlex div').children[0].innerHTML = 'Название: <i>' + info[idx][0] + ' округ</i>';
        document.querySelector('#modal #bigFlex div').children[1].innerHTML = 'Столица: <i>' + info[idx][1] + '</i><br />'
            + 'Площадь: <i>' + info[idx][2].toLocaleString() + ' км.</i><br />'
            + 'Население: <i>' + info[idx][3].toLocaleString() + ' чел.</i><br />'
            + 'Климат: <i>' + info[idx][5] + '</i><br /><br />';
        //document.querySelector('#modal .flex div').children[3].innerHTML = dostoprimechatelnostiLinks[idx] + dostoprimechatelnosi[idx].join('<br/>');
        document.querySelector('#modal #dost').innerHTML = '';
        /*var t = document.createElement('h3');
        t.id = 'dostText';
        t.innerHTML = '<b>Достопримечательности:</b>';*/
        document.querySelector('#modal #dost').innerHTML = '';
        //document.querySelector('#modal #dost').appendChild(t);
        for (let i = 0; i < dostoprimechatelnosti[idx].length; i++) {
                document.querySelector('#modal #dost').innerHTML += '<div><a target="_blank" href="' + dostoprimechatelnostiLinks[idx][i] + '">' + dostoprimechatelnosti[idx][i] + '</a><br/><img class="dostImg" src="imgs/dost/' + idx + '-' + i + '.jpg" /></div>';
        }
        // document.querySelector('#modal #bigFlex div').children[2]
        document.querySelector('#modal #bigFlex div').children[3].firstElementChild.href = 'https://yandex.ru/maps/' + info[idx][4];

        document.body.style.setProperty('--blur', '4px');
        document.body.style.setProperty('--brightness', '0.45');
        document.body.style.setProperty('--interactable', 'none');
        document.body.style.setProperty('--scale', '1');
        document.body.style.setProperty('--modal-witdth', '100%');
        document.body.style.setProperty('--modal--height', document.getElementsByClassName('modal-content')[0].scrollHeight + 'px');

        //console.log('modal!');
    });
}

document.getElementById('send').addEventListener('click', () => {
    //if (selectedObjs.length == 0) return;
    //console.log(selectedObjs.map(x => info[parseInt(x.classList[0])]));
    document.getElementById('modal2').style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.querySelector('.modal-content-2 p').innerHTML = 'Вы выбрали ' + getSelected().join(' регион, ') + ' регион?';
});
document.getElementById('rand').addEventListener('click', () => {
    Array.from(document.getElementsByClassName('selected')).forEach((val) => {
        val.classList.remove('selected');
    });
    let count = Math.floor(Math.random() * (8 - 1) + 1);
    var a = [];
    for (let i = 0; i < count; i++) {
        let b = randNum(8, a);
        a.push(b);
        addSelected(document.getElementsByClassName('hoverable')[b]);
    }
});
Array.from(document.getElementsByClassName('close2')).forEach((val) => {
    val.addEventListener('click', () => {
        document.getElementById('modal2').style.display = 'none';
        document.body.style.overflow = '';
        questions = [];
        questionsAnswered = new Map();
        if (document.querySelector('input[type=radio]:checked') != null) document.querySelector('input[type=radio]:checked').checked = false;
        questionID = 1;
        questionsCount = 0;
        rightAnswered = 0;

        lastGen = new Map();
        impossibleQuestions = [];
        //region = 0;
        //dost = 0;

        Array.from(document.getElementsByClassName('answered')).forEach((v) => v.classList.remove('answered'));
        document.getElementsByClassName('current')[0].classList.remove('current');
        document.getElementsByClassName('point')[0].classList.add('current');
        document.getElementById('previousBtn').disabled = true;
        document.getElementById('nextBtn').disabled = false;
        document.getElementById('summitBtn').disabled = true;

        document.getElementById('defaultInfo').className = '';
        document.getElementById('questionInfo').className = 'hidden';
        document.getElementById('summit').className = 'hidden';
    });
});

document.getElementById('startTest').addEventListener('click', () => {
    for (let i = 0; i < 5; i++) {
        questions.push(generateQuestion());
        questionsCount += 1;
    }
    //console.log(val);
    var val = questions[0];
    document.getElementById('questionInfo').classList = document.getElementById('questionInfo').classList == 'hidden' ? '' : 'hidden';
    document.getElementById('defaultInfo').classList = document.getElementById('defaultInfo').classList == 'hidden' ? '' : 'hidden';
    document.getElementById('questionTitle').innerHTML = val[0];
    document.getElementById('opt1l').innerHTML = val[1][0];
    document.getElementById('opt2l').innerHTML = val[1][1];
    document.getElementById('opt3l').innerHTML = val[1][2];
    document.getElementById('answerStreak').innerText = questionID + '/' + questionsCount + String.fromCharCode(160);
});
for (let i = 0; i < document.getElementById('points').childElementCount; i++) {
    document.getElementById('points').children[i].addEventListener('click', () => {
        var val = questions[i];
        document.getElementById('questionTitle').innerHTML = val[0];
        document.getElementById('opt1l').innerHTML = val[1][0];
        document.getElementById('opt2l').innerHTML = val[1][1];
        document.getElementById('opt3l').innerHTML = val[1][2];
        if (document.getElementsByClassName('current').length != 0) document.getElementsByClassName('current')[0].classList.remove('current');
        questionID = i + 1;
        document.getElementById('points').children[i].classList.add('current');
        document.getElementById('answerStreak').innerText = questionID + '/' + questionsCount + String.fromCharCode(160);

        if (questionsAnswered.has(questionID - 1)) {
            document.querySelectorAll('input[type=radio]')[questionsAnswered.get(questionID - 1)].checked = true;
        } else if (document.querySelector('input[type=radio]:checked') != null) {
            document.querySelector('input[type=radio]:checked').checked = false;
        }
    })
}
document.getElementById('nextBtn').addEventListener('click', () => {
    if (questionID + 1 > questions.length) return;
    if (document.getElementById('previousBtn').disabled)
        document.getElementById('previousBtn').disabled = false;
    if (questionID == questions.length - 1)
        document.getElementById('nextBtn').disabled = true;
    var val = questions[questionID];
    /*if (document.querySelector('input[type=radio]:checked') != null)
        questionsAnswered.set(questionID - 1, getSelectedRadio());*/
    document.getElementById('summitBtn').disabled = questionsAnswered.size != questions.length;
    if (document.getElementsByClassName('current').length != 0) document.getElementsByClassName('current')[0].classList.remove('current');
    questionID += 1;
    document.getElementsByClassName('point')[questionID - 1].classList.add('current');
    //console.log(val);
    document.getElementById('questionTitle').innerHTML = val[0];
    document.getElementById('opt1l').innerHTML = val[1][0];
    document.getElementById('opt2l').innerHTML = val[1][1];
    document.getElementById('opt3l').innerHTML = val[1][2];
    document.getElementById('answerStreak').innerText = questionID + '/' + questionsCount + String.fromCharCode(160);

    if (questionsAnswered.has(questionID - 1)) {
        document.querySelectorAll('input[type=radio]')[questionsAnswered.get(questionID - 1)].checked = true;
    } else if (document.querySelector('input[type=radio]:checked') != null) {
        document.querySelector('input[type=radio]:checked').checked = false;
    }
});

function getGrade(ratio) {
    if (ratio < 0.2) {
        return 1;
    }
    if (ratio >= 0.2 && ratio <= 0.4) {
        return 2;
    }
    if (ratio > 0.4 && ratio <= 0.65) {
        return 3;
    }
    if (ratio > 0.65 && ratio <= 0.85) {
        return 4;
    }
    if (ratio > 0.85) {
        return 5;
    }
}

document.querySelectorAll('input[type=radio]').forEach((elem) => {
    elem.addEventListener('change', () => {
        if (!document.getElementsByClassName('point')[questionID - 1].classList.contains('answered'))
            document.getElementsByClassName('point')[questionID - 1].classList.add('answered');
        questionsAnswered.set(questionID - 1, getSelectedRadio());
        document.getElementById('summitBtn').disabled = questionsAnswered.size != questions.length;
        console.log(questionsAnswered.size);
    });
});
document.getElementById('summitBtn').addEventListener('click', () => {
    document.getElementById('summit').classList.remove('hidden');
    document.getElementById('questionInfo').classList.add('hidden');

    if (questionsAnswered.size != questions.length) return;
    const ctx = document.getElementById('myChart');

    let correct = 0;
    questionsAnswered.forEach((val, key) => {
        switch (questions[key][4]) {
            case 0:
                if (questions[key][1][val].toString().replace(/\s/g, '') == info[questions[key][2]][questions[key][3]].toString().replace(/\s/g, '')) {
                    /*console.group();
                    console.log(questions[key][1][val].toString().replace(/\s/g, ''));
                    console.log(info[questions[key][2]][questions[key][3]].toString().replace(/\s/g, ''));
                    console.groupEnd();*/
                    correct++;
                }
                break;
            case 1:
                if (questions[key][1][val].toString().replace(/\s/g, '') == dostoprimechatelnosti[questions[key][2]][-questions[key][3]].toString().replace(/\s/g, '')) {
                    /*console.group();
                    console.log(questions[key][1][val].toString().replace(/\s/g, ''));
                    console.log(dostoprimechatelnosti[questions[key][2]][-questions[key][3]].toString().replace(/\s/g, ''));
                    console.groupEnd();*/
                    correct++;
                }
                break;
            case 2:
                if (dostoprimechatelnosti[questions[key][2]].indexOf(questions[key][1][val]) != -1) {
                    /*console.group();
                    console.log(dostoprimechatelnosti[questions[key][2]]);
                    console.log(questions[key][1][val]);
                    console.groupEnd();*/
                    correct++;
                }
                break;
        }
    });
    console.log(correct);
    console.log(questionsCount);

    document.getElementById('grade').innerHTML = 'Оценка: ' + getGrade(correct / questionsAnswered.size);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [
                'Верно',
                'Неверно'
            ],
            datasets: [{
                label: 'Количество',
                data: [correct, questionsCount - correct],
                backgroundColor: [
                    '#36A2EB',
                    '#FF6384'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    onClick: () => {},
                    onHover: (evt, item, legend) => {
                        legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
                            colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
                        });
                        legend.chart.update();
                    },
                    onLeave: (evt, item, legend) => {
                        legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
                            colors[index] = color.length === 9 ? color.slice(0, -2) : color;
                        });
                        legend.chart.update();
                    }
                },
                title: {
                    display: true,
                    text: localStorage.getItem('name') + ' (' + localStorage.getItem('class') + ')'
                }
            }
        }
    });
});

document.getElementById('previousBtn').addEventListener('click', () => {
    if (questionID - 2 < 0) return;
    if (questionID - 2 == 0) document.getElementById('previousBtn').disabled = true;
    if (document.getElementById('nextBtn').disabled)
        document.getElementById('nextBtn').disabled = false;
    var val = questions[questionID - 2];
    /*if (document.querySelector('input[type=radio]:checked') != null)
        questionsAnswered.set(questionID - 1, getSelectedRadio());*/
    document.getElementById('summitBtn').disabled = questionsAnswered.size != questions.length;
    if (document.getElementsByClassName('current').length != 0) document.getElementsByClassName('current')[0].classList.remove('current');
    questionID -= 1;
    document.getElementsByClassName('point')[questionID - 1].classList.add('current');
    //console.log(val);
    document.getElementById('questionTitle').innerHTML = val[0];
    document.getElementById('opt1l').innerHTML = val[1][0];
    document.getElementById('opt2l').innerHTML = val[1][1];
    document.getElementById('opt3l').innerHTML = val[1][2];
    document.getElementById('answerStreak').innerText = questionID + '/' + questionsCount + String.fromCharCode(160);

    if (questionsAnswered.has(questionID - 1)) {
        document.querySelectorAll('input[type=radio]')[questionsAnswered.get(questionID - 1)].checked = true;
    } else if (document.querySelector('input[type=radio]:checked') != null) {
        document.querySelector('input[type=radio]:checked').checked = false;
    }
});

/*document.getElementById('answerBtn').addEventListener('click', () => {
    // ToDo: придумать алгоритм чтоб не хранить переменную (типа чтоб тяжелее было списывать :)) 
    // ToDo: хотя можно и переменную (для себя)
    answered = true;
    //questionsAnswered += 1;
    // ToDo: POPRAVIT BARANU
    //!!!!!!!!!!!!!!!!!
    document.getElementById('answerStreak').innerText = questionID + '/' + questionsCount + String.fromCharCode(160);
    switch (questions[questionID - 1][4]) {
        case 0:
            console.log(info[questions[questionID - 1][2]][questions[questionID - 1][3]]);
            console.log(getCheckedInput());
            if (info[questions[questionID - 1][2]][questions[questionID - 1][3]].toString().replace(/\s+/g, '') == getCheckedInput().toString().replace(/\s+/g, '')) {
                document.getElementById('status').innerHTML = 'Статус: <p style="color: green">Верно!</p>';
                rightAnswered += 1;
            } else {
                document.getElementById('status').innerHTML = 'Статус: <p style="color: red">Неверно!</p>';
            }
            break;
        case 1:
            console.log(dostoprimechatelnosti[questions[questionID - 1][2]][-questions[questionID - 1][3]]);
            console.log(getCheckedInput());
            // [2] is region
            //if (dostoprimechatelnosti[questions[questionID - 1][2]][-questions[questionID - 1][3]].toString().replace(/\s+/g, '') == getCheckedInput().toString().replace(/\s+/g, '')) {
            if (info[questions[questionID - 1][2]][0].toString() == getCheckedInput().toString()) {
                document.getElementById('status').innerHTML = 'Статус: <p style="color: green">Верно!</p>';
                rightAnswered += 1;
            } else {
                document.getElementById('status').innerHTML = 'Статус: <p style="color: red">Неверно!</p>';
            }
            break;
        case 2:
            console.log(dostoprimechatelnosti[questions[questionID - 1][2]]);
            console.log(getCheckedInput());
            if (dostoprimechatelnosti[questions[questionID - 1][2]].indexOf(getCheckedInput()) != -1) {
                document.getElementById('status').innerHTML = 'Статус: <p style="color: green">Верно!</p>';
                rightAnswered += 1;
            } else {
                document.getElementById('status').innerHTML = 'Статус: <p style="color: red">Неверно!</p>';
            }
            break;
    }
});*/

function addSelected(elem) {
    document.getElementById('send').disabled = false;
    if (document.getElementsByClassName(elem.classList[0]).length > 1) {
        Array.from(document.getElementsByClassName(elem.classList[0])).forEach((val) => {
            val.classList.add('selected');
        });
    } else
    elem.classList.add('selected');
}

function remSelected(elem) {
    if (document.getElementsByClassName(elem.classList[0]).length > 1) {
        Array.from(document.getElementsByClassName(elem.classList[0])).forEach((val) => {
            val.classList.remove('selected');
        });
    } else
    elem.classList.remove('selected');

    if (document.getElementsByClassName('selected').length == 0) document.getElementById('send').disabled = true;
}
function getSelected() {
    return [...new Set(Array.from(document.getElementsByClassName('selected')).map(x => info[parseInt(x.classList[0]) - 1][0]))];
}
function getSelectedIdx() {
    return [...new Set(Array.from(document.getElementsByClassName('selected')).map(x => parseInt(x.classList[0]) - 1))];
}

function getSelectedRadio() {
    return parseInt(document.querySelector('input[type=radio]:checked').id[3]) - 1;
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = '';

    document.body.style.setProperty('--modal-margin', '10vh');

    document.body.style.setProperty('--blur', '0');
    document.body.style.setProperty('--brightness', '1');
    document.body.style.setProperty('--interactable', 'all');
    document.body.style.setProperty('--scale', '1.1');
}

function shuffle(array) {
    var j, temp;
	for (let i = array.length - 1; i > 0; i--){
		j = Math.floor(Math.random() * (i + 1));
		temp = array[j];
		array[j] = array[i];
		array[i] = temp;
	}
	return array;
}

function randNum(max, exceptArr) {
    var a = Array.from(Array(max).keys());
    if (a.length == exceptArr.length) {
        //console.warn('Список заполнен до предела, возращаем -1');
        return -1;
    }
    a = a.filter((item) => {
        return exceptArr.indexOf(item)==-1;
    });
    return a[Math.floor(Math.random() * a.length)];
}

let genQuestCount = 6;
var lastGen = new Map();
var impossibleQuestions = [];
let lastQuestion = -1; // чтоб было более приятно смотреть
function generateQuestion() {
    let r = randNum(6, impossibleQuestions.concat([lastQuestion]).concat(getSelected().length == 1 ? [0] : []));
    if (lastGen.has(r)) {
        var a = lastGen.get(r);
        region = randNum(getSelected().length, a);
        if (region == -1) {impossibleQuestions.push(r); return generateQuestion();}
        a.push(region);
        lastGen.set(r, a);
    } else {
        region = Math.floor(Math.random() * getSelected().length);
        lastGen.set(r, [region]);
    }

    //~ Seems to generate list without "underfined" elements.
    //~ arr = arr.filter(function (n) { return n !== undefined });

    // // ToDo: это.
    var answers = [];
    var possibleDistricts = [];
    for (let i = 0; i < info.length; i++) {
        if (answers.indexOf(info[i][r]) == -1 && info[i][r] != info[getSelectedIdx()[region]][r])
        {
            answers.push(info[i][r]);
            possibleDistricts.push(i);
        }
    }
    //console.group();
    //console.log(possibleDistricts, answers);
    let i = Math.floor(Math.random() * possibleDistricts.length);
    let first = possibleDistricts[i];
    possibleDistricts.splice(i, 1);
    //console.log(possibleRegions, answers);
    let second = possibleDistricts[Math.floor(Math.random() * possibleDistricts.length)];
    //console.log(info[first], info[second], info[getSelectedIdx()[region]]);
    //console.groupEnd();

    lastQuestion = r;
    switch (r) {
        default: // case 0
            prop_idx = 0;
            dost = Math.floor(Math.random() * 3);
            return ['В каком федеральном округе находится ' + dostoprimechatelnosti[getSelectedIdx()[region]][dost] + '?', shuffle([info[first][0], info[getSelectedIdx()[region]][0], info[second][0]]), getSelectedIdx()[region], 0, 1];
        case 1:
            prop_idx = 1;
            return ['Какая столица у ' + getSelected()[region] + ' округа?', shuffle([info[first][1], info[getSelectedIdx()[region]][1], info[second][1]]), getSelectedIdx()[region], 1, 0];
        case 2:
            prop_idx = 2;
            return ['Какая площадь у ' + getSelected()[region] + ' округа?', shuffle([info[first][2], info[getSelectedIdx()[region]][2], info[second][2]]), getSelectedIdx()[region], 2, 0];
        case 3:
            prop_idx = 3;
            return ['Сколько живут людей в ' + getSelected()[region] + ' округе?', shuffle([info[first][3].toLocaleString(), info[getSelectedIdx()[region]][3].toLocaleString(), info[second][3].toLocaleString()]), getSelectedIdx()[region], 3, 0];
        case 4:
            dost = Math.floor(Math.random() * 2);
            prop_idx = -dost;
            return ['Что из нижеперечисленного находится в ' + getSelected()[region] + ' федеральном округе?', shuffle([dostoprimechatelnosti[first][dost], dostoprimechatelnosti[getSelectedIdx()[region]][dost], dostoprimechatelnosti[second][dost]]), getSelectedIdx()[region], prop_idx, 2];
        case 5:
            prop_idx = 5;
            return ['Какой климат в ' + getSelected()[region] + ' округе?', shuffle([info[first][5], info[getSelectedIdx()[region]][5], info[second][5]]), getSelectedIdx()[region], 5, 0];
    }
}

document.addEventListener('keydown', (e) => {
    if (e.code == 'KeyR') {
        for (let i = 0; i < questions.length; i++) {
            questionsAnswered.set(i, Math.floor(Math.random() * 3));
        }
    }
    if (e.key == 'Escape') closeModal();
});
document.getElementById('close').addEventListener('click', () => {
    closeModal();
});

/* $(function () {
    Tipped.create(".point-tooltip", {position: "top"});
}); */


var loader = document.getElementById('preloader');
window.addEventListener('load', () => {
    setTimeout(() => {loader.className = 's'; clearInterval(a); setTimeout(() => {
        loader.style.display = 'none';
    }, 700);}, 1500);
    let pointCount = 0;
    var a = setInterval(() => {
        pointCount++;
        if (pointCount > 3)
            pointCount = 0;
        document.getElementById('fact').innerHTML = 'Загрузка' + (".".repeat(pointCount));
    }, 500);
    //document.getElementById('fact').innerHTML = facts[Math.floor(Math.random() * facts.length)]
});