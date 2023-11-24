import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function server() {
  try {
    // connecting mongodb through mongoose
    await mongoose.connect(config.db_url as string);

    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Assignment2 app listening on port ${config.port}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

server();
