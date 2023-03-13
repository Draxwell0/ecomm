import redis from 'redis';

const client = redis.createClient({ prefix: 'blacklist', host: 'redis' });

export default client;
