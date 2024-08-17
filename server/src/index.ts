import express from 'express';
import cors from 'cors';
import * as D from 'src/dir';

const app = express();
const port = 3002;

const allowedOrigins = [
  `http://localhost:5504`,
];
//@ts-ignore
function configCors(origin, callback) {
  if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
  } else {
      callback(new Error('Not allowed by CORS'));
  }
}
const corsOptions = {
  origin: configCors,
  methods: 'POST',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.static(D.dist()));

app.get('/', (req, res) => {
  res.send('Hello 333333333333');
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
