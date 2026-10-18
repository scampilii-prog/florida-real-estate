/* Submit the provider's native form in this tab; validate only the local filters. */
(function(){
 const form=document.getElementById('nc-quick-form');if(!form)return;
 const low=document.getElementById('nc-min-price');
 const high=document.getElementById('nc-max-price');
 const error=document.getElementById('nc-search-error');
 function validate(){
  const invalid=Number(low.value)>0&&Number(high.value)>0&&Number(low.value)>Number(high.value);
  high.setCustomValidity(invalid?'Choose a maximum price at least as high as the minimum.':'');
  error.hidden=!invalid;
  error.textContent=invalid?'Choose a maximum price at least as high as the minimum.':'';
  return !invalid;
 }
 low.addEventListener('change',validate);high.addEventListener('change',validate);
 form.addEventListener('submit',function(event){
  if(!validate()){event.preventDefault();high.reportValidity();return;}
  // Leave the native POST and browser history intact so Back returns here.
  form.target='_self';
 });
})();
