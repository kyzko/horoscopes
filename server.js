let express = require('express'),
    bodyParser = require('body-parser'),
    mongoClient = require('mongodb'),
    mongoose = require('mongoose'),
    mongoosetext = require('mongoose'),
    app = express(),
    moment = require('moment'),
    conform = require('conform');

let schema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
});

let Text = new mongoosetext.Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

let goroscope = mongoosetext.model('Test', Text);
let comment = mongoose.model('Comment', schema);

mongoosetext.connect('mongodb://localhost/info');
mongoose.connect('mongodb://localhost/test');
app.use(bodyParser.urlencoded({ extend: true}));
app.use(bodyParser.json());
app.use(express.static('views'));


// let aries = new goroscope ({
//     name: 'aries',
//     text: 'Овен открывает новый зодиакальный цикл, относится к стихии Огня, обладает особенной харизмой (качеством) первооткрывателя, инициативой и целеустремленностью. Даже обладающие спокойным темпераментом, Овны никогда не забывают про свои цели и, как правило, рано или поздно достигают желаемого. Инициатива и активность представителей этого знака позволяет находить новые задачи, которые Овен ставит перед своими последователями. Загореться идеей и зажечь ее огонь для других для Овна важнее, чем довести дело до конца. Рутинные обязанности, последовательность и педантичность — не являются сильными чертами этого знака. Напор, кратковременное мощное усилие, поиск цели и разведка боем — вот что выгодно отличает Овна от других знаков зодиака'
// });
// aries.save();
// let taurus = new goroscope ({
//     name: 'taurus',
//     text: 'Тельцам сегодня лучше отказаться от планирования и ориентироваться на требования момента. Настроение вплоть до вечера может оставаться неровным. Вашими и чужими поступками нередко будут руководить внезапные порывы и минутные прихоти. Не на всех людей вы сможете с уверенностью положиться, а порой будете удивляться сами себе. Не слишком предсказуем и внешний ход событий. Большую роль сыграет случай, при этом симпатии фортуны не всегда будут на вашей стороне. Рекомендуется отложить любые инициативы'
// });
// taurus.save();
// let twins = new goroscope({
//     name: 'twins',
//     text: 'Внимание Близнецов может быть приковано к непростым социальным событиям или неспокойной атмофере в группе, а также к сетевым дискуссиям, вызванным тем или иным общественным явлением. Ваши персональные убеждения и интересы сегодня могут потеряться на фоне тенденций всеобщей значимости. Строить собственные планы на будущее будет нелегко, пока остается тревожной перспектива в целом. Не исключен кризис дружбы. Непредсказуем итог предпринятых инициатив, произнесенных слов. Небезопасны эксперименты.'
//     });
// twins.save();
// let canser = new goroscope({
//     name: 'canser',
//     text: 'Раков день подталкивает к нервозности и неадекватным реакциям, заставляет вести себя нетипично и делать ошибки. Будет трудно проводить в жизнь личные планы, так как велико влияние обстановки. В игру могут вступить силы, превосходящие ваши. Могут оказаться не в духе партнер, друг или человек, от которого сейчас зависит осуществление ваших желаний. Стоит воздержаться от собеседований, вступления в должность. Проявив инициативу или другим путем обратив на себя внимание, вы можете об этом пожалеть.'
// });
// canser.save();
// let leo = new goroscope({
//     name: 'leo',
//     text: 'Фиксированный знак стихии огня, Лев обладает даром созидания и настойчивостью в достижении своих целей. Это деятельный человек, стремящийся к успеху и популярности. Сильная, чувствительная и любящая натура, часто попадает под влияние эмоций и чувств. Лев великодушен, решителен и храбр. Самообладание и амбициозность являются сильными чертами этого знака. Не равнодушен к вниманию, лести и роскоши'
// });
// leo.save();
// let virgo = new goroscope({
//     name: 'virgo',
//     text: 'Сегодня у Дев нет рычагов влияния на обстановку. Придется принять как должное любой поворот событий, независимо от того, радует он вас или огорчает. Возможно, вы не сможете провести между хорошим и плохим четкую грань, в связи с непредсказуемостью и оригинальностью происходящего. Будет трудно подойти к делу хладнокровно и сделать объективные выводы. Возможна склонность драматизировать ситуацию. Стоит быть терпимее к чужим проблемам и слабостям. От любых инициатив лучше сознательно воздержаться.'
// });
// virgo.save();
// let libra = new goroscope({
//     name: 'libra',
//     text: 'В этот день Весам предстоит либо соответствовать обстановке и оправдывать чужие ожидания, жертвуя собой, либо уходить в оппозицию. Многие Весы будут вынуждены подстраиваться под другого человека, несмотря на его странности, оригинальные привычки или неприятный характер. Звезды не советуют искать союзников и посредников, привлекать клиентов, впервые выступать перед аудиторией. Ваши слова могут вызвать неожиданную реакцию. Если вам нужно сохранить автономность, лучше избегать вовлечения в чужие дела'
// });
// libra.save();
// let scorpio = new goroscope({
//     name: 'scorpio',
//     text: 'Скорпионам придется смириться с беспорядком или цепью сюрпризов. Роковое стечение обстоятельств заставит забыть о правилах, стандартах или привычном расписании. Раздражающим фактором может стать ситуация на службе. Не исключено, что вы будете вынуждены подавить свои личные эмоции в угоду коллективным тенденциям. Возможно, именно в этом сегодня будет состоять ваш профессиональный долг. Звезды не советуют всерьез идти против обстоятельств: попытка бунта может негативно отразиться на самочувствии.'
// });
// scorpio.save();
// let sagittarius = new goroscope({
//     name: 'sagittarius',
//     text: 'Стрельцы могут надеяться на везение. Многим представителям знака повезет не благодаря, а вопреки обстоятельствам. Не исключено, что удачный поворот случится в последний момент, когда битва уже казалась проигранной. Чтобы эта тенденция сработала, важно отказаться от претензии управлять событиями и довериться судьбе. Звезды подсказывают, что поддержка свыше сейчас не дает вам полной свободы, а лишь позволяет избежать худшего. Не стоит начинать новые дела, стремиться к публичному статусу, известности.'
// });
// sagittarius.save();
// let carpicon = new goroscope({
//     name: 'capricon',
//     text: 'У Козерогов сегодня сложный день, так как любая ситуация плохо поддается контролю. Немало усилий может отнять попытка наладить быт или отношения в семье, подавить «бунт на корабле». Обстановка станет критичной, если к неуправляемым внешним событиям прибавится ваша неготовность контролировать собственные эмоции. Также вы можете стать заложником стандартных взглядов или своих личных шаблонов. Звезды советуют искать нетривиальный выход из положения, так как традиционные методы могут не работать.'
// });
// carpicon.save();
// let aquarius = new goroscope({
//     name: 'aquarius',
//     text: 'В первой половине дня Водолеев может окружать бытовая или служебная рутина, но даже в знакомых мелочах найдется что-то интересное, неожиданное. Самым важным будет то, что задело эмоционально, не исключена нестандартная реакция на привычные вещи. Может закончиться непредсказуемо лечебный процесс. Вечер обещает яркие впечатления, усилит потребность в общении, даст шанс освежить взаимные чувства, вернуть внимание публики. Появятся отличные условия для творческого выступления, романтического свидания.'
// });
// aquarius.save();
// let fish = new goroscope({
//     name: 'fish',
//     text: 'Рыбам стоит минимизировать свое участие в событиях, отложить необязательные дела. В этот день бессильны расчеты, может быть ошибочной даже ваша тонкая интуиция. Все, что вы сделаете, потребует в лучшем случае кардинальной переработки, а в худшем, заведет в тупик или принесет убыток. Если вам покажется, что найдено неожиданное решение проблемы, лучше отнестись к «открытию» скептически: скорее всего, вы заблуждаетесь. Не стоит именно сегодня активно помогать друзьям, можно ухудшить их положение'
// });
// fish.save();



app.post('/api/comments', function (req, res, next) {
    console.log(conform.validate(req.body, schema));
    let data = new comment(req.body);
    console.log(data);
    data.save().then(response => res.json(response));

});

app.get('/api/comments', function (req, res, next) {
    comment.find().then(result => res.json(result));
});

app.post('/api/info', function (req, res, next) {
    goroscope.find({name: req.body.name}).then(result => res.json(result));
});

app.get('/api/info', function (req, res, next) {
    goroscope.find({}).then(result => res.json(result));
});

app.listen('3000', function () {
    console.log('API listen');
});