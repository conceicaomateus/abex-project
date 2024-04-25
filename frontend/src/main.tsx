import React from 'react'
import ReactDOM from 'react-dom/client'
import "./main.css"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
    </AccordionItem>
  </Accordion>

  </React.StrictMode>,
)
