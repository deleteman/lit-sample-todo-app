import { CSSResultGroup, html,css, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"

export type TodoItemType = {
    id: Number,
    text: String
}

@customElement("todo-item")
export class ToDoItem extends LitElement {
    @property({type: (id: Number) => null}) 
    itemRemover = (id: Number) => null

    @property({type: Object}) 
    item: TodoItemType = {
        text: 'test',
        id: 0
    };

    static styles?: CSSResultGroup | undefined = css`
        :host {
            padding: 5px;
        }
        :host div {
            border: 1px solid #000;
        }
    `;


    render () {
        return html`
            <div>
                    <button aria-label="delete" @click="${() => this.itemRemover(this.item.id)}">
                        Del
                    </button>
                    <span>${this.item.text}</span>
            </div>
`
    }
}