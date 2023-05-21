import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ReportService } from '../report.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {


  dataTypeOfWork: number[] = [];
  labelTypeOfWork: string[] = ['Phức tạp', 'Trung bình', 'Đơn giản'];

  dataPriority: number[] = [];
  labelPriority: string[] = ['Khẩn cấp', 'Cao', 'Trung bình', 'Thấp'];

  dataGroupOfWork: number[] = [];
  labelGroupOfWork: string[] = ['Làm mới', 'Sửa lỗi'];

  dataStatus: number[] = [];
  labelStatus: string[] = ['Đã hoàn thành', 'Đang thực hiện', 'Việc cần làm', 'Tạm dừng', 'Hủy'];

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.reportService.getDataByTypeOfWork().subscribe(res => {
      this.dataTypeOfWork = res;
      this.renderChart('chartTypeofWork', this.dataTypeOfWork, this.labelTypeOfWork);
    });
    this.reportService.getDataByPriority().subscribe(res => {
      this.dataPriority = res;
      this.renderChart('chartPriority', this.dataPriority, this.labelPriority);
    });
    this.reportService.getDataByGroupOfWork().subscribe(res => {
      this.dataGroupOfWork = res;
      this.renderChart('chartGroupofWork', this.dataGroupOfWork, this.labelGroupOfWork);
    });
    this.reportService.getDataByStatus().subscribe(res => {
      this.dataStatus = res;
      this.renderChart('chartStatus', this.dataStatus, this.labelStatus);
    });
  }

  renderChart(typeOfChart: string, data: number[], label: string[]) {
    const chart = new Chart(typeOfChart, {
      type: 'pie',
      data: {
        labels: label,
        datasets: [{
          data: data
        }],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'right',
          },
        }
      }
    });
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
