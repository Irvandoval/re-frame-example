(ns my-re-frame.subs
  (:require
   [re-frame.core :as re-frame]))

(re-frame/reg-sub
 ::username
 (fn [db]
   (:username db)))

(re-frame/reg-sub
 ::github-profile
 (fn [db]
   (:github-profile db)))

(re-frame/reg-sub
 ::sopa
 (fn [db] 
   (:sopa db)))
