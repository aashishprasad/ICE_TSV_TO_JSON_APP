import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result_Model } from './result_model';
import { ClipboardService } from 'ngx-clipboard';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrls: ['./display-page.component.css']
})
export class DisplayPageComponent implements OnInit {
  resultModel: Result_Model = {json_result: "", url_result: "", error_result:""};
  tsv_data : any;
  currentFilename;
  
  constructor(private http: HttpClient,
              private _clipboardService: ClipboardService,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {

    let filename = this.route.snapshot.params.filename;
    
    if(filename!=null){
      console.log("in if");
      console.log(filename);
      this.getDatabyFileName(filename);
    }    
  }

  getDatabyFileName(filename){
    this.http.get('http://localhost:3000/api/parser/result?filename='+ filename, {responseType: 'text' as 'json'}).subscribe(val => {
      this.tsv_data = val;
      this.getOldData(this.tsv_data);
    });

  }


  getOldData(data){
    console.log("Old data called"+ data);
    this.http.post<Result_Model>('http://localhost:3000/api/parser', { data }).subscribe(val => {
      this.resultModel.url_result = val.url_result;
      this.resultModel.json_result = JSON.stringify(val.json_result);
      this.resultModel.error_result = val.error_result;

      // call myModalOpen()
      this.myModalOpen();
    });
  }

  onSubmit(data){
    this.http.post<Result_Model>('http://localhost:3000/api/parser', { data }).subscribe(val => {
      this.resultModel.url_result = val.url_result;
      this.resultModel.json_result = JSON.stringify(val.json_result);
      this.resultModel.error_result = val.error_result;
    });
  }

  async copyUrl(){
    var copyText = document.getElementById("urlData").innerText;
    this._clipboardService.copy(copyText);
  }

  async myModalOpen() {
    var popup = document.getElementById("popupModal");
      popup.style.display = "block";

    var tsvForm = document.getElementById("tsvForm");
      tsvForm.style.opacity = "0.1";

  }
  async myModalClose() {
    var popup = document.getElementById("popupModal");
      popup.style.display ="none";

      var tsvForm = document.getElementById("tsvForm");
      tsvForm.style.opacity = "1";
  }
}