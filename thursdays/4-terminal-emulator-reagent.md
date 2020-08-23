---
title: Terminal Emulator in Reagent
subtitle: Writing a Terminal Emulator in Reagent.
---

*September 24, 2015*

[Here](http://karni.nei.gy) is a simple Reagent terminal emulator
written in Clojurescript. It is basically a Lojban blog, and you can
type 'bavla'i' (Lojban 'next') to get an older article.

In case you are not familiar with Reagent, it is a React.js wrapper for
Clojurescript. For example, the following codes create a "terminal page"
and mount it to the document:

~~~ clojure
(def outputs (atom []))

(defn terminal-page []
  [:div.terminal-wrapper
   [:div.terminal-content
    (for [output @outputs]
      [:div.line
       output])
    [prompt-view]]])

(reagent/render-component [terminal-page]
  (.getElementById js/document "app"))
~~~

Reagent uses a similar syntax to Hiccup, which is at the same time,
valid Clojure codes, so that you can have whole power of Clojure while
creating a template.

The `terminal-page` function above queries an atom called `outputs`, and
wrap all items in the output list to a `div` of class `line`. It also
contains a `prompt-view`, which I will talk about later.

## Output to the Terminal

To output new texts to the terminal, you simply modify the `output`
atom. The below function outputs a new line:

~~~ clojure
(defn outln [line]
  (swap! outputs conj line))
~~~

## The Prompt View

The prompt view works with a hidden text input, which is always focused.
It reads keyboard input and change an atom called `prompt-value`
accordingly. A separate `span` is used to actually display the value.

~~~ clojure
(defn prompt-view []
  [:div.line
   [:span {:style {:font-weight 700}}
    "karni@nei.gy:~#  "]
   [:span @prompt-value]
   [:span.prompt "\u00a0"]
   [:input {:style {:opacity 0}
            :auto-focus true
            :value @prompt-value
            :on-blur #(let [target (-> % .-target)]
                        (.setTimeout js/window
                          (fn [] (.focus target)) 0))
            :on-change #(reset! prompt-value
                          (-> % .-target .-value))
            :on-key-down #(case (.-which %)
                            37 (.preventDefault %)
                            39 (.preventDefault %)
                            27 (reset! prompt-value "")
                            13 (do
                                 (execute @prompt-value)
                                 (reset! prompt-value ""))
                            nil)}]])
~~~

Note that when outputting from the prompt, we also need to output the
current state of the prompt since it will not be saved automatically:

~~~ clojure
(outln [:div
        [:span {:style {:font-weight 700}} "karni@nei.gy:~# "]
        [:span prompt]])
~~~

## Scroll to Bottom Automatically

Another problem with the above code is that the view will not be
automatically scrolled to the bottom after each output. The solution is
to create a scroll to bottom function:

~~~ clojure
(defn scroll-to-bottom []
  (println "Scrolling ...")
  (let [height (-> js/document .-body .-scrollHeight)]
    (println height)
    (.scrollTo js/window 0 height)))
~~~

And we also need to change the render function with a new scrollable
view:

~~~ clojure
(def terminal-page-scroll
  (with-meta terminal-page
    {:component-did-mount #(do (.log js/console "did-mount")
                               (scroll-to-bottom))
     :component-did-update #(do (.log js/console "did-update")
                                (scroll-to-bottom))}))

(reagent/render-component [terminal-page-scroll]
  (.getElementById js/document "app"))
~~~
