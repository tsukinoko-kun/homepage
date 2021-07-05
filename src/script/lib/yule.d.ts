declare type Class<T extends object> = new (...arguments: any[]) => T;

interface String {
  hash: (allowNegative?: boolean) => number;

  /**
   * Format the string using the placeholder {}.
   */
  format: (...placeholderValues: Array<string>) => string;

  /**
   * Make the first letter of every word in upper case.
   */
  capitalize: () => string;
}

interface Array<T> {
  /**
   * Fisher-Yates Shuffle
   */
  shuffle: () => Array<T>;

  clear: () => Array<T>;

  searchFor: (comparator: (x: T) => boolean) => T;
}

interface Math {
  /**
   * Bitwise rotate a 32-bit number to the left.
   */
  bitRotateLeft: (num: number, cnt: number) => number;

  /**
   * @returns >=min & <=max
   * @param value The value to be clamped
   * @param min The lower bound of the result
   * @param max The upper bound of the result
   */
  clamp: <T extends number | bigint>(value: T, min: T, max: T) => T;

  /**
   * Calculates the Nth Fibonacci
   * @param n
   * @returns fib
   */
  fibonacci: (n: number) => bigint;

  /**
   * Euclidean algorithm
   */
  gcd: (a: number, b: number) => number;

  /**
   * Performs a linear interpolation between the values a and b.
   * @param alpha ranges from 0-1.
   */
  lerp: (a: number, b: number, alpha: number) => number;

  /**
   * Checks if a number is prime
   * @param n Number to check
   * @returns TRUE if prime; otherwise FALSE
   */
  isPrime: (n: bigint) => boolean;

  /**
   * Calculates the Nth prime number
   * @param n How many prime
   * @returns Prime
   */
  nthPrime: (n: number) => bigint;

  /**
   * Calculates the next prime number
   * @param start Number to start from
   * @returns Prime
   */
  nextPrime: (n: bigint) => bigint;

  /**
   * Round to a specified precition
   */
  roundOff: (x: number, precision: number) => number;

  /**
   * Add integers, wrapping at 2^32.
   * This uses 16-bit operations internally to work around bugs in interpreters.
   *
   * @param a First integer
   * @param b Second integer
   * @returns Sum
   */
  safeAdd: (a: number, b: number) => number;

  /**
   * Square root of a positive bigint
   */
  sqrtBigInt: (value: bigint) => bigint;
}

declare namespace Yule {
    const version = 20210703;
}
declare namespace Yule {
    /**
     * Stores information about components to simplify the resolving.
     */
    class ComponentFactory {
        private readonly code;
        resolve(componentEl: HTMLComponentElement): this;
        private constructor();
        static new(location: string): Promise<ComponentFactory>;
    }
}
declare class HTMLComponentElement extends HTMLElement {
    name: string;
}
declare namespace Yule {
    /**
     * @static Class to controll component access.
     *
     * Components are stored in /components/ as html-files.
     *
     * You can specify the Component name using the "name" attribute.
     *
     * __Variables__
     *
     * Variables are specified as normal attributes, where the attribute name is the variable name and the attribute value becomes the variable value.
     *
     * innerHTML will be parsed implicitly as content.
     *
     * __Example__
     *
     * ``` html
     * <!-- /components/button.html -->
     * <div>I am a <i content="{var1}"></i> <i content="{content}"></i> button component!</div>
     * ```
     *
     * ``` html
     * <!-- /index.html -->
     * <component name="button" var1="very" >cool</component>
     * ```
     *
     * ``` html
     * <!-- what /index.html will render -->
     * <div>I am a <i>very</i> <i>cool</i> button component!</div>
     * ```
     *
     * No additional setup required!
     *
     * Recursive components are possible.
     */
    class Components {
        private constructor();
        /**
         * Function to resolve a components location.
         */
        static location(component: string): string;
        private static readonly componentLibrary;
        /**
         * Resolves the components asynchronously and recursively.
         * @param root Target HTMLElement.
         */
        static resolveComponents(root?: HTMLElement): Promise<void>;
    }
}
declare namespace Yule {
    /**
     *Sends an asynchronous http-get request to a given url
     * @param url Url to send the request to
     * @param cached Whether you want the response to be cached or not
     * @deprecated use fetch
     */
    function httpGet(url: string, cached?: boolean): Promise<string>;
    /**
     *Sends an asynchronous http-get request to a given url
     * @param url Url to send the request to
     * @param cached Whether you want the response to be cached or not
     * @returns Parsed JSON Object from request
     * @deprecated use fetch
     */
    function httpGetParsed<T>(url: string, cached?: boolean): Promise<T>;
}
declare namespace Yule {
    /**
     * A Bindable stores the data and controls notifyPropertyChanged calls.
     * ``` html
     * <button
     *   content="{Binding clickCount}"
     *   click="{Increment clickCount}"
     * >Click me!</button>
     * ```
     */
    class Bindable<T> {
        private buffer;
        private locked;
        private readonly context;
        readonly name: string;
        private converter;
        constructor(context: BindingContext, name: string, converter?: (input: any) => T);
        protected notifyPropertyChanged(): void;
        /**
         * Set or change the type of this Bindable.
         */
        applyType<NT>(converter: (input: any) => NT): Bindable<NT>;
        /**
         * Set the data value.
         */
        set(value: T): void;
        /**
         * Gets the data value.
         */
        get(): T;
        /**
         * Lock notifyPropertyChanged calls
         */
        lock(): void;
        /**
         * Unlock notifyPropertyChanged calls
         */
        unlock(): void;
    }
}
declare namespace Yule {
    interface IBindingTarget {
        HTMLElement: Element;
        attribute: string;
    }
    /**
     * Stores the data bindings it the associated targets.
     *
     * BindingContext handles the data updates of the binding targets.
     *
     * ``` html
     * <button
     *   content="{Binding clickCount}"
     *   click="{Increment clickCount}"
     * >Click me!</button>
     * ```
     */
    class BindingContext {
        private readonly bindingTargets;
        private readonly bindables;
        private readonly target;
        protected constructor(target: HTMLElement);
        resolveBindings(): void;
        static getContextFor(target: DomFrame | HTMLElement): BindingContext;
        clearTargets(): void;
        onNotifyPropertyChangedAll(): void;
        onNotifyPropertyChanged(bindable: Bindable<any>, ignore?: Element): void;
        bind(bindableName: string, bindingTarget: IBindingTarget): void;
        getBinding<T>(bindableName: string, converter?: (input: any) => T): Bindable<T> | undefined;
    }
    const globalBindingContext: BindingContext;
    const globalContextReady: Promise<BindingContext>;
}
declare namespace Yule {
    /**
     * Inject code from another html-file into a existing HTMLElement.
     */
    class DomFrame {
        private readonly element;
        private readonly basePath;
        private current?;
        private requestOptions;
        readonly context: BindingContext;
        /**
         * @param selector DOM query selector for the target Element
         * @param basePath the root location used to resolve the requested files
         */
        constructor(selector: string, basePath?: string);
        /**
         * Options to be used at the fetch request.
         */
        setRequestOptions(newOptions: RequestInit): void;
        /**
         * Gets the content at the specified url and injects it into the Frame. Returns true if successful, false if not.
         */
        inject(content: string | Array<HTMLElement>): Promise<boolean>;
        /**
         * Set the innerHTML as string manually
         */
        overwrite(innerHTML: string): void;
        /**
         * Clear the frames content.
         */
        clear(): void;
        /**
         * Scrolls the element's parent container such that the element on which scrollIntoView() is called is visible to the user.
         */
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        /**
         * Returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
         */
        getBoundingClientRect(): DOMRect;
        /**
         * Returns a collection of DOMRect objects that indicate the bounding rectangles for each CSS border box in a client.
         */
        getClientRects(): DOMRectList;
        /**
         * Returns a reference to the HTMLElement
         */
        getHtmlRef(): HTMLElement;
        /**
         * Shortcut method which creates a new Animation, applies it to the element, then plays the animation.
         * @param keyframes Either an array of keyframe objects, or a keyframe object whose property are arrays of values to iterate over. See Keyframe Formats for more details.
         * @param options Either an integer representing the animation's duration (in milliseconds), or an Object containing one or more timing properties
         * @returns the created Animation object instance.
         */
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions): Animation;
        /**
         * @returns an array of all Animation objects currently in effect whose target elements are descendants of the document. This array includes CSS Animations, CSS Transitions, and Web Animations.
         */
        getAnimations(): Animation[];
        /**
         * Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched.
         * @param options sets listener-specific options. For compatibility this can be a boolean, in which case the method behaves exactly as if the value was specified as options's capture.
         */
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        /**
         * CSSStyleDeclaration
         */
        getStyle(): CSSStyleDeclaration;
        /**
         * Allows for manipulation of element's class content attribute as a set of whitespace-separated tokens through a DOMTokenList object.
         */
        getClassList(): DOMTokenList;
    }
}
declare namespace Yule {
    /**
     * The router offers high-performance, asynchronous and cached loading of subpages.
     *
     * Standard settings require that your subpages are stored as HTML files in a "content" folder, which is in the root directory of your web server.
     * In addition, only paths of the main domain are routed (this can be overwritten using getCurrentSubPageName and pageTitleToHref).
     *
     * To do special things after the HTML-injection, you can overwrite onInject (this method is by default empty).
     *
     * To link an anchor tag to the router, add a "route" attribute with the title of the subpage.
     * ```html
     * <a route="about">About</a>
     * <a route="home">Home</a>
     * ```
     * If no href attribute is given, it will be added automatically.
     */
    class Router {
        /**
         * The sub-page Frame.
         */
        protected readonly frame: Yule.DomFrame;
        /**
         * Currently loaded path on the Frame.
         */
        protected lastLocation: string;
        private sitemap;
        protected readonly homeAsEmpty: boolean;
        protected readonly homeSite: string;
        protected readonly fallbackSite: string;
        protected readonly setWindowTitle?: (newPage: string) => string;
        protected readonly siteNameClassPushElement: HTMLElement;
        readonly context: BindingContext;
        /**
         * @param frame Yule.DomFrame to inject the page.
         * @param sitemap Set of all available subpages
         * @param homeSite home page (default is "home").
         * @param homeAsEmpty set this to true if you want the home page to be displayed as website root, false if not (default is true)
         * @param fallbackSite 404 page, default is value of homeSite.
         * @param siteNameClassPushElement the HTMLElement to push the current page title as class (default is document.body).
         * @param setWindowTitle if the title of the tab should be updated with the subpage, enter a formatting string here. Placeholder is {}
         */
        constructor(param: {
            frame: Yule.DomFrame;
            sitemap: Set<string>;
            homeSite?: string;
            homeAsEmpty?: boolean;
            fallbackSite?: string;
            siteNameClassPushElement?: HTMLElement;
            setWindowTitle?: (newPage: string) => string;
        });
        /**
         * Links every anchor tags to the router
         */
        private linkAnchorsToRouter;
        /**
         * Gets the name of the page that should be displayed now
         */
        protected getCurrentSubPageName(): string;
        /**
         * Converts a given page page title into a path
         * Default subpage location: /content/*.html
         */
        protected pageTitleToStoreLocation(newPage: string): string;
        /**
         *  Converts a given page title to the associated href attribute value
         */
        protected pageTitleToHref(newPage: string): string;
        /**
         * Load special sub-page content if needed.
         */
        protected onInject(_newPage: string): void;
        /**
         * @returns the current subPage name
         */
        getPage(): string;
        /**
         * Injects the content of a given sub-page into the sub-page Frame.
         * @param newPage has to be listed in the sitemap.
         */
        setPage(newPage: string, doPushState?: boolean): Promise<void>;
        protected onPopState(ev: PopStateEvent): void;
        /**
         * Push a new location to the url without reloading the page.
         */
        protected pushState(newPage: string): void;
    }
}
declare namespace Yule {
    /**
     * This is a basic ViewModel, used to control the bindings.
     * Is is made to be used in MVVM.
     */
    abstract class ViewModel {
        protected readonly context: Yule.BindingContext;
        constructor(context: Yule.BindingContext);
    }
}
declare namespace Yule {
    /**
     * Uses a single, fixed-size buffer as if it were connected end-to-end.
     */
    class CircularBuffer<T> {
        private readonly buffer;
        cursor: number;
        readonly size: number;
        constructor(size?: number, defaultValues?: Array<T>);
        push(value: T): void;
        pop(): void;
    }
}
declare namespace Yule {
    /**
     * Readonly List
     */
    class ImmutableList<T> {
        protected readonly bucket: Array<T>;
        readonly length: number;
        constructor(...value: Array<Array<T> | ImmutableList<T> | T>);
        [Symbol.iterator](): T[];
        /**
         * @returns a copy of the values.
         */
        value(): Array<T>;
        /**
         * @returns a concatination of its values plus a given dataset.
         */
        plus(valueToAdd: Array<T> | ImmutableList<T> | T): ImmutableList<T>;
        /**
         * Iterates through the list using a given callback function.
         */
        forEach(callback: (element: T) => void): void;
        /**
         * Iterates through the list asynchronously using a given callback function.
         */
        forEachAsync(callback: (element: T) => void): Promise<void>;
    }
}
declare namespace Yule {
    /**
     * Promise based wrapper around Browsers IndexedDB
     */
    class indexedDB<T> {
        protected readonly dbName: string;
        protected readonly dbVersion: number;
        onupgradeneeded?: (this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any;
        constructor(dbName: string, version?: number, onupgradeneeded?: (this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any);
        /**
         * Gets the value at a given index.
         */
        get(id: string): Promise<T>;
        /**
         * Iterates through the table using a given callback function.
         */
        select(callback: (cursor: IDBCursorWithValue) => void): Promise<void>;
        /**
         * Tries to delete a data at a given id.
         * @returns true if successful and false if not.
         */
        delete(id: string): Promise<boolean>;
        /**
         * Sets the value at a given id.
         */
        set(id: string, value: T): Promise<void>;
        /**
         * Updates the value of a given key and id in the table.
         * @param id of the table
         * @param key of the value object
         * @param newValue of the object at the given key
         */
        update<K extends keyof T, V extends T[K]>(id: string, key: K, newValue: V): Promise<void>;
    }
}
declare namespace Yule {
    type LinkedListNode<T> = [
        LinkedListNode<T> | undefined,
        T,
        LinkedListNode<T> | undefined
    ];
    /**
     * Represents a doubly linked list
     */
    export class LinkedList<T> {
        protected head: LinkedListNode<T> | undefined;
        protected tail: LinkedListNode<T> | undefined;
        length: number;
        constructor(content?: Array<T>);
        private LinkedListNode;
        /**
         * Initializes a new instance of the LinkedList class that contains a given value.
         */
        static of<T>(value: T): LinkedList<T>;
        [Symbol.iterator](): T[];
        /**
         * Adds a new node containing the specified value at the end of the LinkedList.
         */
        append(value: T): void;
        /**
         * Adds a new node containing the specified value at the start of the LinkedList.
         */
        prepend(value: T): void;
        /**
         * Deletes the head node, node before becomes new head.
         */
        deleteHead(): T | undefined;
        /**
         * Deletes the tail node, node before becomes new tail.
         */
        deleteTail(): T | undefined;
        /**
         * Cuts out a specific area of the LinkedList with a given index and the amount of nodes to delete.
         * @param start index to start
         * @param deleteCount
         * @returns true if the action was possible, false if not.
         */
        splice(start: number, deleteCount?: number): boolean;
        /**
         * Removes all nodes from the LinkedList.
         */
        clear(): void;
        /**
         * Finds the first node that contains the specified value.
         */
        indexOf(value: T): number;
        /**
         * Finds the node at the given index
         */
        at(index: number): T | undefined;
        /**
         * Determines whether a value is in the LinkedList
         */
        includes(value: T): boolean;
        /**
         * Finds the first node that contains the specified value and returns a reference to it.
         */
        search(value: T): LinkedListNode<T> | undefined;
        /**
         * Checks whether the List contains nodes or not.
         */
        isEmpty(): boolean;
        /**
         * Iterates through the list using a given callback function.
         */
        forEach(callback: (value: T, prev: LinkedListNode<T> | undefined, next: LinkedListNode<T> | undefined, index: number) => void): void;
        /**
         * @returns a new Array using the LinkedLists nodes.
         */
        toArray(): Array<T>;
        toString(): string;
    }
    export {};
}
declare namespace Yule {
    /**
     * This class represents a string-like object whose value is a mutable sequence of characters.
     */
    class StringBuilder {
        private bucket;
        private _length;
        /**
         * Gets the length of the current StringBuilder object.
         */
        get length(): number;
        set length(value: number);
        constructor(value?: string | undefined);
        [Symbol.iterator](): string[];
        /**
         * Converts the value of this instance to a String.
         */
        toString(): string;
        /**
         * Appends a copy of the specified string to this instance.
         */
        append(value: string): void;
        /**
         * Appends the default line terminator to the end of the current StringBuilder object.
         */
        appendLine(value: string): void;
        /**
         * Removes all characters from the current StringBuilder instance.
         */
        clear(): void;
        /**
         * Replaces text in a string, using a regular expression or search string.
         * @param searchValue A string to search for.
         * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
         */
        replace(searchValue: string | RegExp, replaceValue: string): void;
        /**
         * Count the characters in this instance.
         */
        private countLength;
    }
}
declare function sealed(constructor: Function): void;
declare namespace Yule {
    class DI {
        private constructor();
        /**
         * Returns the inheritance chain of an object.
         */
        static getInheritanceChain(obj: Object): Array<string>;
        /**
         * Adds the specified dependency as a Singleton service to the collection if the service type hasn't already been registered. You will get the same object reference on every injection call.
         * @param obj reference to the object you want to register.
         * @returns the object obj.
         */
        static registerSingle<T extends Object>(obj: T): T;
        /**
         * Adds the specified dependency as a Factory service to the collection if the service type hasn't already been registered. You will get a new object reference on every injection call.
         * @param constructionIntroduction a function that constructs the object you want to register.
         * @returns the constructionIntroduction function.
         */
        static registerFactory<T extends Object>(constructionIntroduction: () => T): () => T;
        /**
         * Tries to resolve the given dependency and returns its object reference.
         * @param C The class you want to be injected.
         * @returns a object reference of the given type.
         */
        static inject<T extends Object>(C: Class<T> | Function): T;
        /**
         * Runs a callback function, with a reference to the original dependency management functions as parameters.
         */
        static registerDependencies(callback: (get: <T extends Object>(C: Class<T>) => T, single: <T extends Object>(obj: T) => T, factory: <T extends Object>(constructionIntroduction: () => T) => () => T) => void): void;
    }
}
declare namespace Yule {
    /**
     * returns true if the window is inside a frame, false if it is not.
     */
    function checkFrame(w?: Window): boolean;
}
declare namespace Yule {
    function copy(text: string): Promise<void>;
}
declare namespace Yule {
    function delay(ms: number): Promise<void>;
    function retriggerableDelay(delayId: string, ms: number, callback: Function): void;
}
declare namespace Yule {
    /**
     * The doOnce function executes a callback only one time
     */
    function doOnce(callback: Function, err?: Function): any;
}
declare namespace Yule {
    function range(head: number, tail: number, stepSize?: number): number[];
}
declare namespace Yule {
    function require(src: string, integrity?: string): Promise<Event | void>;
}
