
const express = require('express');
const path = require('path');
const pug = require('pug');
const socket = require('socket.io');
const nodemailer = require('nodemailer');

//initialzations
const app = express();
//const server = http.createServer(app);

app.use(express.urlencoded({extended:false}));
app.use(express.json());
//static file
app.use(express.static(path.join(__dirname,'public')));

//settings
app.set('views',path.join( __dirname,'views'));



//routes
app.get('/',function(req,res){
	res.render('inicio.pug')
});

app.post('/send-email', async (req,res) => {
	const { name, email, phone, message } = req.body;

	contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
            <li>PhoneNumber: ${phone}</li>
        </ul>
        <p>${message}</p>
	`;
	
	const transporter = nodemailer.createTransport({
		service:'gmail',
		auth:{
			user:"julioricardo95@gmail.com",
			pass:"-------"
		}
	});

	const info = await transporter.sendMail({
		from:'belleza a domicilio',
		to:'julioricardo95@gmail.com',
		subject:'belleza a domicilio',
		html: contentHTML
	});

	console.log(contentHTML);

	res.redirect('/');
});

app.get('*',(req,res)=>(
	res.status(404).send('pagina no existe')
));

//star the server
app.set('port',process.env.PORT || 3000);
const server = app.listen(app.get('port'));

const io = socket(server);

io.on('connection',function(socket) {
	console.log('new connection');

	socket.on('chat:message',(data) => {
		io.sockets.emit('chat:message',data);
	});

	socket.on('chat:typing',(data)=>{
		socket.broadcast.emit('chat:typing',data);
	});
});