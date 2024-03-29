(ns my-re-frame.core
  (:require
   [reagent.core :as reagent]
   [re-frame.core :as re-frame]
   [my-re-frame.events :as events]
   [my-re-frame.views :as views]
   [my-re-frame.config :as config]
   ))


(defn dev-setup []
  (when config/debug?
    (println "dev mode")))

(defn ^:dev/after-load mount-root []
  (re-frame/clear-subscription-cache!)
  (reagent/render [views/main-panel]
                  (.getElementById js/document "app")))

(defn init []
  (re-frame/dispatch-sync [::events/initialize-db])
  (dev-setup)
  (mount-root))
