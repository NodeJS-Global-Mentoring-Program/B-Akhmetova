import initData from '../db/initData';

export const launchDB = async (db: any) => {
    await db.sequelize.sync({ force: true });
    await db.sequelize.authenticate();
    await initData(db);
};
