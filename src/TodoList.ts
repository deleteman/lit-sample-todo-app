import { LitElement, html,css, CSSResultGroup } from "lit";
import { customElement, property } from "lit/decorators.js";
import {createRef, ref} from 'lit/directives/ref.js'
import { TodoItemType } from "./ToDoItem";



@customElement("todo-list")
export class TodoList extends LitElement {

    @property()
    taskError: string = "";

    @property()
    todos: TodoItemType[] = [];

    inputValue: string = "";

    inputRef = createRef<HTMLInputElement>()

    static styles?: CSSResultGroup | undefined = css`

        section {
            width: 70%;
            margin: 0 auto;
        }

        label {
            font-weight: bold;
        }

        .task-error {
            color: red;
        }

        .stack-vertical {
            display: flex;
            flex-direction: column;
        }
        .stack-horizontal{
            display: flex;
            flex-direction: row;
        }
    `

    removeTodo(id: Number) {
        this.todos = this.todos.filter( t => t.id != id)
    }

    addToDo(evt: Event) {
        evt.preventDefault()
        const inputElem = this.inputRef.value;
        const inputValue = (inputElem && inputElem.value) || "";
        
        if(inputValue.trim() == "") {
            return this.taskError = "Can't create empty task"
        } else {
            this.taskError = "";
        }

        this.todos = [...this.todos, {
            text: inputValue,
            id: this.todos.length + 1
        }]
        if(inputElem) {
            inputElem.value = ""
        }
    }

    render () {
        return html`<main maxWidth="sm">
            <section>
                <h1>LIT-based To-Do app</h1>
                <div>
                    <div class="stack-horizontal">
                        <label>New Task
                            <input 
                                ${ref(this.inputRef)}
                            >
                            ${
                                this.taskError ? 
                                    html`
                                        <span class="task-error">${this.taskError}</span>
                                    `       
                                : html``
                            }
                        </label>
                        <button @click="${this.addToDo}" >
                            Save
                        </button>
                    </div>
                    <div>
                        ${this.todos && 
                                this.todos.map( t => 
                                     html `<todo-item .item=${t} .itemRemover=${this.removeTodo.bind(this)} ></todo-item>`
                                    )
                        }
                    </div>
                    <p>
                        <h2>Total pending tasks: ${this.todos.length}</h2>
                    </p>
                </div>
            </section>
        </main>
`
    }
}