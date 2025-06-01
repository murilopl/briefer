import markdownit from 'markdown-it'
import { Plugin, PluginKey } from 'prosemirror-state'
import { DOMParser } from 'prosemirror-model'
import { Extension } from '@tiptap/core'

export const md = markdownit('default', { html: false, breaks: true }).enable(['table'])

export const MarkdownPaste = Extension.create({
  name: 'markdownPaste',
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('markdownPaste'),
        props: {
          handlePaste(view, event) {
            const text = event.clipboardData?.getData('text/plain')
            if (!text) return false

            const html = md.render(text)
            const wrapper = document.createElement('div')
            wrapper.innerHTML = html
            const node = DOMParser.fromSchema(view.state.schema).parse(wrapper)
            view.dispatch(view.state.tr.replaceSelectionWith(node))
            return true
          },
        },
      }),
    ]
  },
})