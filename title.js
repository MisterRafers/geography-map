/*document.getElementById('name').addEventListener('input', (e) => {
    if (e.target.value.length < e.target.minLength) return;
    console.log(e.target.value.replace(/<\/?[^>]+(>|$)/g, ''));
    localStorage.setItem('name', e.target.value.replace(/<\/?[^>]+(>|$)/g, ''));
});
document.getElementById('class').addEventListener('input', (e) => {
    localStorage.setItem('class', e.target.value.replace(/<\/?[^>]+(>|$)/g, ''));
});*/
/*document.getElementById('name').addEventListener('keydown', (e) => {
    if (!(e.key == 'А' || e.key == 'Б' || e.key == 'В' || e.key == 'Г')) {
        e.preventDefault();
    }
});*/
document.getElementById('startBtn').addEventListener('click', () => {
    if (document.getElementById('name').value.length < document.getElementById('name').minLength) {
        alert('Имя указано неправильно!');
        return;
    }
    if (document.getElementById('class').value.length < document.getElementById('class').minLength) {
        alert('Класс указан неправильно!');
        return;
    }
    localStorage.setItem('name', document.getElementById('name').value.replace(/<\/?[^>]+(>|$)/g, ''));
    localStorage.setItem('class', document.getElementById('class').value.replace(/<\/?[^>]+(>|$)/g, ''));
    window.location.href = window.location.origin;
});

function trueName() {
    document.querySelector('input#name').value = 'Абдулахан Ахмедридов Ахмеджбрякович';
    document.querySelector('input#class').value = '=)';
    console.error('TRUE NAME =)', );
}

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

let fact_id = -1;
fact_id = Math.floor(Math.random() * facts.length) - 1;
let instructionID = 2;
document.getElementById('nextFact').addEventListener('click', () => {
    fact_id = Math.min(Math.max(fact_id + 1, 0), facts.length-1);
    document.getElementById('fact').innerHTML = '<p>' + facts[fact_id] + '</p>';
});
document.getElementById('nextFact').click();
function changeInstruction(id) {
    document.getElementById('nextInstruction').disabled = false;
    document.getElementById('container').style.display = id == 0 ? 'block' : 'none';
    document.getElementById('instruction').style.display = id == 0 ? 'none' : 'block';
    instructionID = id == 0 ? 2 : instructionID;
    document.body.style.setProperty('--child-id', id);
    document.getElementById('instructions').textContent = "#instruction > :not(:nth-child(" + document.body.style.getPropertyValue('--child-id') + ")) { display: none; }";
}
function nextInstruction() {
    changeInstruction(instructionID);
    instructionID++;
    if (instructionID > document.getElementById('instruction').childElementCount - 1)
        document.getElementById('nextInstruction').disabled = true;
}

function autoFact() {
    setTimeout(() => {
        document.getElementById('nextFact').click();
        console.log('next');
        autoFact();
    }, 1000 + document.getElementById('fact').innerText.length * 33);
}
autoFact();