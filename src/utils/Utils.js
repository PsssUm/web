
export function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? undefined : decodeURIComponent(sParameterName[1]);
        }
    }
};

export const getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = window.document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  };
export const setCookie = (name,value) => {
    var expires = "";
    var days = 9999
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    window.document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

export const getToken = () => {
    return getCookie("token");
};
export const getTechnologies = () => {
    const technologies = ["Swift", "Java", "Go", "PHP", "C#", "Python", "JS", "Kotlin", "C", "Dart", "HTTP", "GIT", "Node.js", "React JS", "React Native", "Flutter", "Vue.js", "GameDev", "Ruby", "Dagger", "React Java", "Coroutines", "SwiftUI", "UIKit", ".NET", "ASP", "SQL"]
    var array = []
    technologies.forEach(element => {
        array.push({title : element, isSelected : false, toString: function(){return this.title;}})
    });
    return array
};
export const getTimeRanges = () => {
    const times = ['10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00']
    var array = []
    times.forEach(element => {
        array.push({title : element, isSelected : true, toString: function(){return this.title;}})
    });
    return array
};

