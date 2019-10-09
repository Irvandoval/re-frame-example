(ns my-re-frame.views
  (:require
   [re-frame.core :as re-frame]
   [my-re-frame.subs :as subs]
   [my-re-frame.events :as events]))

(defn profile-card
  [github-profile]
  (if (nil? github-profile)
    [:p "User not loaded yet."]
    [:div {:class "container"}
     [:div {:class "card text-white bg-dark"}
      [:div {:class "card-header"}]
      [:img {:class "card-img-top" :src (:avatar_url github-profile) :alt "user profile"}]
      [:ul {:class "list-group list-group-flush text-center"}
       [:li {:class "list-group-item list-group-item-info"}
        [:h3 {:class "card-title"} (:name github-profile)]
        [:p {:class "card-text"} (:login github-profile)]]]
      [:div {:class "card-body text-center"}
       [:p {:class "card-text"} (:bio github-profile)]
       [:p [:i {:class "fa fa-building"}] (str " Company: " (:company github-profile))]
       [:p [:i {:class "fa fa-map-marker"}] (str " Location: " (:location github-profile))]
       [:a {:href (:html_url github-profile) :class "btn btn-outline-primary"} 
        [:i {:class "fa fa-github"}] " Go to GitHub's profile"]]]]))

(defn main-panel []
  (let [username (re-frame/subscribe [::subs/username])
        github-profile (re-frame/subscribe [::subs/github-profile])]
    [:div {:class "container"}
     [:h3 {:class "text-center"} "GitHub profile finder"]
     [:br]
     [:div {:class "row"}
      [:div {:class "col-md-4 form-group"}
       [:label {:for "username"} "GitHub Username"]
       [:input {:type "text" 
                :class "form-control" 
                :id "username" 
                :placeholder "Enter a valid GitHub username" 
                :value @username 
                :on-change #(re-frame/dispatch [::events/username-change (.. % -target -value)])}]
       [:br]
       [:button {:class "btn btn-success" :on-click #(re-frame/dispatch [::events/search-username  @username])} "Search"]]
      [:div {:class "col-md-4"} [profile-card @github-profile]]]])) 