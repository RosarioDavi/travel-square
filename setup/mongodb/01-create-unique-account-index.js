conn = Mongo();
db = conn.getDB('travelsquared');

db.accounts.insertOne({
  _id: ObjectId('633184f42ec069ab607b0b5b'),
  username: 'Muhammad',
  email: 'muhammad@example.com',
  password: '$2b$12$gqB.kZtNIbyKcYxStjtVTenCwLcqmUSFN/Yda2rP1znKlTHX6wukq',
  full_name: 'Muhammad Rahman',
  avatar: 'www.example.com/lol.jpeg',
  roles: [
      'general',
      'admin'
  ]
});
db.accounts.insertOne({
  _id: ObjectId('633185412ec069ab607b0b5c'),
  username: 'Sarah',
  email: 'sarah@example.com',
  password: '$2b$12$BnCFBYWNZI1dpQ3djPS5DuWszH3nc2v6nYPcz8OZpr6LPZSysrJty',
  full_name: 'Patron',
  avatar: 'www.example.com/lmao.jpeg',
  roles: [
      'general',
      'admin'
  ]
});
db.accounts.createIndex(
  {email: 1},
  {unique: true},
);
