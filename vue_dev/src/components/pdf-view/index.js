import pdfView from './src/index'

/* istanbul ignore next */
pdfView.install = function (Vue) {
  Vue.component(pdfView.name, pdfView)
}

export default pdfView
