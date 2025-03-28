import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App"
import { ThemeProvider } from "./components/theme-provider"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      
        <App />
    
    </BrowserRouter>
  </React.StrictMode>,
)
/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
<App />
</ThemeProvider>*/