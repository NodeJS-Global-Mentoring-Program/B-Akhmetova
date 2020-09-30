import express from 'express';

export const handleQuery  = async (query: Promise<any>, next: express.NextFunction): Promise<any> => {
    try {
        return await query;
    } catch (error) {
        console.log('Error:', error.message);
        return  next(error);
    }
};
