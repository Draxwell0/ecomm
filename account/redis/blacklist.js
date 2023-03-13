import redis from 'redis';

const client = redis.createClient({ prefix: 'blacklist' });

export default client;
