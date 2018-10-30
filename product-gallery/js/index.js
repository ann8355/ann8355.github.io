function closeWin(path,name) {
    window.opener=null;
    window.open(path,name);
    window.close();
}
  
  