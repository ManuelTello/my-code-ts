export class BaseViewModel<T> {
    public bag: T;

    public title: string;

    public parent: string;

    public constructor(bag: T, title: string, parent: string) {
        this.bag = bag;
        this.title = title;
        this.parent = parent;
    }
}