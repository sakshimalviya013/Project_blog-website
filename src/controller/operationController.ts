import { Operation } from '../entities/Operation';
import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { Between, Like } from 'typeorm';

export const createOperation = async (req: Request, res: Response) => {
    try {
        const operationRepo = AppDataSource.getRepository(Operation);
        const userRepo = AppDataSource.getRepository(User);

        const { userid, image, description, title } = req.body;
        if (userid === undefined) {
            throw new Error("Userid is NULL ");
        }
        let user = await userRepo.findOne({ where: { userid: userid } });

        if (user === null)
            throw new Error("User not found");

        let operation: Operation = new Operation();
        operation.image = image;
        operation.description = description;
        operation.createdAt = new Date();
        operation.title = title;

        operation.user = user;
        const createdOperation: Operation = await operationRepo.save(operation)

        res.status(200).json({
            success: true,
            createdOperation,
        }
        );
    } catch (error) {

        res.status(401).json({
            success: false,
            message: error
        });
    }
}

export const getAllOperation = async (req: Request, res: Response) => {
    try {

        const operationRepo = AppDataSource.getRepository(Operation);
        const getAllOperation = await operationRepo.find();
        res.status(200).json({
            success: true,
            getAllOperation
        }
        );
    } catch (error) {

        res.status(401).json({
            success: false,
            message: error
        });
    }
}

export const updateOperation = async (req: Request, res: Response) => {
    try {
        const operationRepo = AppDataSource.getRepository(Operation);
        const { operationid, title, image, description } = req.body;

        const operation = await operationRepo.findOne({ where: { operationid: operationid } });
        if (operation === null) {
            throw new Error(`No post found`)
        }
        operation.title = title;
        operation.image = image;
        operation.description = description;
        // operation.createdAt = new Date();

        const updatedOperation = await operationRepo.save(operation);
        res.status(200).json({
            success: true,
            updatedOperation
        }
        );
    } catch (error) {

        res.status(401).json({
            success: false,
            message: error
        });
    }
}

export const deleteOperation = async (req: Request, res: Response) => {
    try {
        const operationRepo = AppDataSource.getRepository(Operation);
        const { operationid } = req.params;
        await operationRepo.delete(operationid);
        res.status(200).json({
            success: true,
            message: " Post deleted successfully"
        }
        );
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error
        });
    }
}

