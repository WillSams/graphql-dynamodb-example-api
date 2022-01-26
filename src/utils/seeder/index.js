const _ = require('lodash');

const faker = require('faker');
const moment = require("moment");

const boysNames = ['Abdullah', 'Adam', 'Adrian', 'Adriel', 'Alaric', 'Alejandro', 'Alexander', 'Allan', 'Ambrose',
    'Ameer', 'Anders', 'Austin', 'Benjamin', 'Bennett', 'Bentley', 'Bode', 'Anthony', 'Braden', 'Brooks', 'Calvin',
    'Carl', 'Carlos', 'Daniel', 'Dario', 'Dash', 'Declan', 'Diego', 'Dominic', 'Elijah', 'Emmanuel', 'Emory', 'Ethan',
    'Everett', 'Forest', 'Gabriel', 'Gary', 'Gavin', 'Thomas', 'Hassan', 'Henry', 'Hiro', 'Idris', 'Ira', 'Jace',
    'James', 'Jasper', 'Jayce', 'Jon', 'Jose', 'Juan', 'Robert', 'Kai', 'Kaiden', 'Kayden', 'Kristian', 'Kristopher',
    'Kye', 'Liam', 'Lorenzo', 'Lucas', 'Madden', 'Magnus', 'Marco', 'Mason', 'Mateo', 'Matias', 'Max', 'Maxwell',
    'Michael', 'Miguel', 'Misael', 'Mylo', 'Nicolás', 'Noah', 'Oliver', 'Pablo', 'Parker', 'Pedro', 'Ryker', 'Salem',
    'Santiago', 'Shin', 'Silas', 'Tru', 'Wesley', 'Wewu', 'William', 'Xavier', 'Xu', 'Yeun', 'Yoshi', 'Zion',];

const girlsNames = ['Aaliyah', 'Abigail', 'Addison', 'Alice', 'Allison', 'Amelia', 'Anna', 'Aria', 'Ariana', 'Aubrey',
    'Audrey', 'Aurora', 'Autumn', 'Ava', 'Avery', 'Bella', 'Brooklyn', 'Camila', 'Caroline', 'Charlotte', 'Chloe',
    'Claire', 'Cora', 'Delilah', 'Eleanor', 'Elena', 'Eliana', 'Elizabeth', 'Ella', 'Ellie', 'Emilia', 'Emily', 'Emma',
    'Evelyn', 'Everly', 'Gabriella', 'Genesis', 'Gianna', 'Grace', 'Hailey', 'Hannah', 'Harper', 'Hazel', 'Hikaru',
    'Isabella', 'Isla', 'Ivy', 'Josephine', 'Kennedy', 'Kinsley', 'Layla', 'Leah', 'Li', 'Lillian', 'Lily', 'Lucy',
    'Luna', 'Madelyn', 'Madison', 'Maya', 'Mia', 'Mila', 'Mirai', 'Nan', 'Naomi', 'Natalia', 'Natalie', 'Nevaeh',
    'Nora', 'Nova', 'Olivia', 'Paisley', 'Penelope', 'Quinn', 'Riley', 'Ruby', 'Sadie', 'Sarah', 'Savannah', 'Scarlett',
    'Serenity', 'Skylar', 'Sofia', 'Sono', 'Sophia', 'Sophie', 'Stella', 'Valentina', 'Victoria', 'Violet', 'Willow',
    'Yuki', 'Yuna', 'Zoe', 'Zoey',];

const getFakeName = teamId => {
    const firstName = teamId.startsWith('boys') ? _.sample(boysNames) : _.sample(girlsNames);
    return `${firstName} ${faker.name.lastName()}`;
}

const getFakeBirthdate = teamId => {
    const birthdate = () => {
        if (teamId === 'girlsU9' || teamId === 'boysU9') return faker.date.between('2013-01-01', '2013-12-31')
        if (teamId === 'girlsU11' || teamId === 'boysU11') return faker.date.between('2011-01-01', '2011-12-31')
        if (teamId === 'girlsU13' || teamId === 'boysU13') return faker.date.between('2009-01-01', '2009-12-31')
        if (teamId === 'girlsU15' || teamId === 'boysU15') return faker.date.between('2007-01-01', '2007-12-31');
    };

    return moment(birthdate()).format("YYYY-MM-DD");
};

const getFakeHeight = teamId => {
    const heightRange = () => {
        if (teamId === 'girlsU9') return { min: 40, max: 58 };
        if (teamId === 'girlsU11' || teamId === 'boysU9') return { min: 45, max: 63 };
        if (teamId === 'girlsU13' || teamId === 'boysU11') return { min: 50, max: 68 };
        if (teamId === 'girlsU15' || teamId === 'boysU13') return { min: 55, max: 73 };
        if (teamId === 'boysU15') return { min: 60, max: 78 };
    };

    return faker.random.number(heightRange());
}

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
}

const getFakeJerseyNumber = () => faker.random.number({ min: 01, max: 99 });

const getFakeHomeTown = () => {
    const cities = ['Chesnee', 'Greer', 'Inman', 'Landrum', 'Spartanburg', 'Wellford', 'Woodruff',];
    const city = _.sample(cities);

    return `${city}, SC`;
}

const getShootingFoot = () => {
    const feet = ['left', 'right', 'both',];
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