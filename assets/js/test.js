(function(){
  function updateTime(){
    var el = document.getElementById('time');
    if(!el) return;
    var now = new Date();
    el.textContent = now.toLocaleTimeString();
  }
  document.addEventListener('DOMContentLoaded', function(){
    updateTime();
    setInterval(updateTime, 1000);
    var greetBtn = document.getElementById('greetBtn');
    if (greetBtn){
      greetBtn.addEventListener('click', function(){ alert('Hello from test.js!'); });
    }
  });
})();
