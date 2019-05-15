export abstract class Trigger {
    public abstract async execute(): Promise<void>;
};