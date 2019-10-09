(ns my-re-frame.events
  (:require
   [re-frame.core :as re-frame]
   [my-re-frame.db :as db]
   [day8.re-frame.http-fx]
   [ajax.core :as ajax]))

(re-frame/reg-event-db
 ::initialize-db
 (fn [_ _]
   db/default-db))

(re-frame/reg-event-db
 ::username-change
 (fn [db [_ new-name-value]]
   (assoc db :username new-name-value)))

(re-frame/reg-event-db
 ::good-http-result
 (fn [db [_ resp]]
   (println resp)
   (assoc db :github-profile resp)))

(re-frame/reg-event-db
 ::bad-http-request
 (fn [db [_ resp]]
   (js/console.error resp)))

(re-frame/reg-event-fx
 ::search-username
 (fn [db [_ username]]
   {:http-xhrio {:method :get
                 :uri (str "https://api.github.com/users/" username)
                 :timeout 8000
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success [::good-http-result]
                 :on-failure [::bad-http-request]}}))
