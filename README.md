1. What is <pre > tag and what it is used for?
   => The <pre> HTML tag is used to display text in a preformatted way. It preserves the original format of the text, including spaces and line breaks, making it useful for displaying code snippets, poetry, or other text that requires a specific layout.
   => represents preformatted text which is to be presented exactly as written in the HTML file.
   like font, Whitespace inside this element is displayed as written.

   example:
    <pre>
     L          TE
       A       A
         C    V
          R A
          DOU
          LOU
         REUSE
         QUE TU
         PORTES
       ET QUI T'
       ORNE O CI
        VILISÉ
       OTE-  TU VEUX
        LA    BIEN
       SI      RESPI
               RER       - Apollinaire
   </pre>

2. Difference between Class and Id:

-Uniqueness:
ID: An ID attribute must be unique on a single web page. You can only have one element with a specific ID
Class: A class can be used by multiple elements on a single page, or even throughout your entire website.

-Usage:
ID: targeting element.
Class: styling element.

-Specificity:
Id selector: Higher specificity.
Class selector: Lower specificity.

3. Difference between display-none, opacity-0 and visibility-none

Property
display: none=> Visibility:Hidden, Layout Space:Removed, Interaction:No, Use Case:Completely hide elements
opacity: 0=> Visibility:Transparent, Layout Space:Occupied, Interaction:Yes, Use Case:Fade effects, temporarily hide content
visibility: hidden=> Visibility:Hidden, Layout Space:Occupied, Interaction:No, Use Case:Hide content for layout or future use

4. Difference between absolute, relative, fixed and sticky positions

Static positioning: is the default for all elements and doesn't affect the normal document flow.
Absolutely positioned elements can overlap other elements.
Fixed positioning can cause layout issues when the content around it is scrollable.
Sticky positioning is a relatively new feature with some browser compatibility considerations.

Relative positions:(original position vanda top,right,left,bottom use garna painxa)
-The element is positioned relative to its normal (origin) position in the document flow.
-Remains in the document flow, so other elements are still positioned as if the relative element were in its original position.

Absolute positioning: (Document flow vanda bahira niskinxa)
-Positioned relative to the nearest positioned ancestor(parent) if there is non takes the viewport as its parent.
-Removed from the normal document flow, so it doesn't affect the position of other elements.
-Use case: Pop-up boxes, tooltips, images within a container.

Fixed Positioning:
-Positioned relative to the viewport.
-Removed from the document flow.
-Use case: Sidebars, navigation bars that stay put while scrolling.

Position Sticky:
-Itself within scrollable container (until threshold met)

- mix of relative and fixed.
  -stays in document flow(initially).
  -Use case: Headers that stay visible while scrolling content

centering a div:
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);