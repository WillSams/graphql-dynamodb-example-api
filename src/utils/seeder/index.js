const _ = require('lodash');

const faker = require('faker');
const moment = require('moment');

const boysNames = ['Abdullah', 'Adam', 'Adrian', 'Adriel', 'Alaric', 'Alejandro', 'Alexander', 'Allan', 'Ambrose', 'Ameer',
    'Anders', 'Antonee', 'Austin', 'Benjamin', 'Bennett', 'Bentley', 'Bode', 'Booker', 'Anthony', 'Braden', 'Brooks',
    'Calvin', 'Carl', 'Carlos', 'Cooper', 'Daniel', 'Dario', 'Darius', 'Dash', 'Declan', 'Diego', 'Dominic', 'Elijah',
    'Emmanuel', 'Emory', 'Eric', 'Erik', 'Ethan', 'Everett', 'Forest', 'Gabriel', 'Gary', 'Gavin', 'Thomas', 'Hakeem',
    'Hassan', 'Henry', 'Hiro', 'Idris', 'Ira', 'Isaiah', 'Jace', 'Jamal', 'James', 'Jasper', 'Jayce', 'Jeremiah', 'Jon',
    'Josiah', 'Jose', 'Juan', 'Robert', 'Kai', 'Kaiden', 'Kayden', 'Kahlil', 'Kristian', 'Kristopher', 'Kye', 'Lemarcus',
    'Liam', 'Lorenzo', 'Lucas', 'Madden', 'Malik', 'Magnus', 'Marco', 'Mason', 'Mateo', 'Matias', 'Max', 'Maxwell', 'Michael',
    'Miguel', 'Misael', 'Mylo', 'Nicolás', 'Noah', 'Oliver', 'Pablo', 'Parker', 'Pedro', 'Ryker', 'Salem', 'Santiago', 'Shin',
    'Silas', 'Treyvon', 'Tru', 'Wesley', 'Wewu', 'William', 'Xavier', 'Xu', 'Yeun', 'Yoshi', 'Zion',];

const girlsNames = ['Aaliyah', 'Abigail', 'Addison', 'Alice', 'Allison', 'Amelia', 'Anna', 'Aniyah', 'Aria', 'Ariana', 'Aubrey',
    'Audrey', 'Aurora', 'Autumn', 'Ava', 'Avery', 'Bella', 'Brenda', 'Brianna', 'Brooklyn', 'Camila', 'Caroline', 'Charlotte', 'Chloe',
    'Chantelle', 'Claire', 'Colby', 'Cora', 'Courtney', 'Delilah', 'Destiny', 'Eleanor', 'Elena', 'Eliana', 'Elizabeth', 'Ella',
    'Ellie', 'Emilia', 'Emily', 'Emma', 'Evelyn', 'Everly', 'Gabriella', 'Genesis', 'Gianna', 'Grace', 'Hailey', 'Hannah', 'Harper',
    'Hazel', 'Hikaru', 'Isabella', 'Imani', 'Isis', 'Isla', 'Ivy', 'Janet', 'Jasmine', 'Josephine', 'Keisha', 'Kennedy', 'Kinsley',
    'Kourtney', 'Ladonna', 'Layla', 'Leah', 'Li', 'Lillian', 'Lily', 'Lucy', 'Luna', 'Madelyn', 'Madison', 'Maya', 'Mia', 'Mila',
    'Mirai', 'Nan', 'Naomi', 'Natalia', 'Natalie', 'Nevaeh', 'Nikita', 'Nora', 'Nova', 'Olivia', 'Paisley', 'Penelope', 'Quinn',
    'Riley', 'Ruby', 'Sadie', 'Sarah', 'Savannah', 'Scarlett', 'Serenity', 'Skylar', 'Sofia', 'Sono', 'Sophia', 'Sophie', 'Stella',
    'Tanisha', 'Valentina', 'Victoria', 'Violet', 'Willow', 'Yuki', 'Yuna', 'Zoe', 'Zoey',];

const getFakeName = teamId => {
    const firstName = teamId.startsWith('boys') ? _.sample(boysNames) : _.sample(girlsNames);
    return `${firstName} ${faker.name.lastName()}`;
};

const getFakeBirthdate = teamId => {
    const birthdate = () => {
        if (teamId === 'girlsU9' || teamId === 'boysU9') return faker.date.between('2013-01-01', '2013-12-31');
        if (teamId === 'girlsU11' || teamId === 'boysU11') return faker.date.between('2011-01-01', '2011-12-31');
        if (teamId === 'girlsU13' || teamId === 'boysU13') return faker.date.between('2009-01-01', '2009-12-31');
        if (teamId === 'girlsU15' || teamId === 'boysU15') return faker.date.between('2007-01-01', '2007-12-31');
    };

    return moment(birthdate()).format('YYYY-MM-DD');
};

const getFakeHeight = teamId => {
    const heightRange = () => {
        if (teamId === 'girlsU9') return { min: 40, max: 58 };
        if (teamId === 'girlsU11' || teamId === 'boysU9') return { min: 45, max: 63 };
        if (teamId === 'girlsU13' || teamId === 'boysU11') return { min: 50, max: 68 };
        if (teamId === 'girlsU15' || teamId === 'boysU13') return { min: 55, max: 73 };
        if (teamId === 'boysU15') return { min: 60, max: 75 };
    };

    return faker.random.number(heightRange());
};

const getFakeWeight = teamId => {
    // this isn't really scientific shit right here...
    const weightRange = () => {
        if (teamId === 'girlsU9') return { min: 35, max: 75 };
        if (teamId === 'girlsU11' || teamId === 'boysU9') return { min: 45, max: 95 };
        if (teamId === 'girlsU13' || teamId === 'boysU11') return { min: 55, max: 115 };
        if (teamId === 'girlsU15' || teamId === 'boysU13') return { min: 65, max: 145 };
        if (teamId === 'boysU15') return { min: 75, max: 175 };
    };
    return faker.random.number(weightRange());
};

const getFakeJerseyNumber = pos => {
    if (pos === 'G') return _.sample([1, 12, 23, 34, 45,]);
    if (pos === 'D') return _.sample([2, 3, 4, 5, 13, 14, 15, 16, 24, 25, 26, 27, 35, 36, 37, 38, 46, 47, 48, 49,]);
    if (pos === 'M') return _.sample([6, 8, 17, 18, 19, 22, 28, 29, 30, 33, 39, 40, 41, 44, 50, 51, 52, 55,]);
    if (pos === 'F') return _.sample([7, 9, 10, 11, 20, 21, 31, 32, 42, 43, 53, 54]);
};

const getFakeHomeTown = () => {
    const cities = [
        'Anderson', 'Boiling Springs', 'Campobello', 'Chesnee', 'Duncan', 'Enoree', 'Gaffney',
        'Greer', 'Greenville', 'Inman', 'Landrum', 'Laurens', 'Lyman', 'Moore', 'Pauline', 'Reidville',
        'Roebuck', 'Saluda', 'Spartanburg', 'Union', 'Wellford', 'Woodruff',
    ];
    const city = _.sample(cities);

    return `${city}, SC`;
};

const getShootingFoot = pos => {
    const feet = pos === 'F' ? ['left', 'right', 'both',] : ['left', 'right'];
    const foot = _.sample(feet);

    return foot;
};

module.exports = {
    getFakeBirthdate,
    getFakeHeight,
    getFakeHomeTown,
    getFakeJerseyNumber,
    getFakeName,
    getFakeWeight,
    getShootingFoot,
};