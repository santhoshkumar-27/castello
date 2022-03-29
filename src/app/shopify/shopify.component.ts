import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexYAxis, ApexStroke, ApexPlotOptions, ApexDataLabels, ApexFill, ApexTooltip, ApexNoData } from "ng-apexcharts";
import { ShopifyService } from '../shared/shopify/shopify.service';

export type ChartOptionsI = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  colors: string[];
  noData: ApexNoData;
};

export type ChartOptions1I = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
  noData: ApexNoData;
  // colors: string[];
};
@Component({
  selector: 'app-shopify',
  templateUrl: './shopify.component.html',
  styleUrls: ['./shopify.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopifyComponent {
  @ViewChild("chart") chart!: ChartComponent;
  @ViewChild("chart1") chart1!: ChartComponent;
  public sales!: ChartOptionsI;
  public order!: ChartOptions1I;
  constructor(
    private router: Router,
    private shopify: ShopifyService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.renderChart()
    this.getShopifyData();
  }
  renderChart() {
    this.sales = {
      colors: ['#271cd7'],
      series: [],
      chart: {
        height: 350,
        type: "line"
      },
      title: {
        text: "Sales"
      },
      noData: {
        text: 'loading...'
      },
      yaxis: {
        tickAmount: 4,
        min: 0,
        max: 6000,
        axisBorder: {
          show: true,
          // color: '#e4e4e4',
          offsetX: 0,
          offsetY: 0
        },
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: "category",
        min: 0,
        categories: ["02/14", "02/15", "02/16", "02/17", "02/18", "02/19", "02/20", "02/20"],
        axisBorder: {
          show: true,
          color: '#78909C',
          offsetX: 0,
          offsetY: 0
        },
      }
    };
    this.order = {
      series: [],
      chart: {
        type: "bar",
        height: 350
      },
      title: {
        text: "orders"
      },
      noData: {
        text: 'loading...',
        style: {
          color: '#271cd7',
          fontSize: '2rem'
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "10px",
          colors: {
            ranges: [
              {
                from: 500,
                to: 750,
                color: "#5c1ad1"
              },
              {
                from: 750,
                to: 1000,
                color: "#521dde"
              },
              {
                from: 1000,
                to: 1250,
                color: "#271cd7"
              },

              {
                from: 1250,
                to: 1500,
                color: "#5c1ad1"
              },

            ],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "02/14",
          "02/15",
          "02/16",
          "02/17",
          "02/18",
          "02/19",
          "02/20"
        ]
      },
      yaxis: {
        min: 0,
        max: 1500,
        tickAmount: 6,
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          }
        }
      }
    }
  }
  getShopifyData() {
    this.getSalesData();
    this.getOrderData();
  }
  // For Sales chart
  getSalesData() {
    this.shopify.getSalesData().subscribe(
      (res: number[]) => {
        const sales = res;
        this.chart.updateSeries([{
          name: 'Sales',
          data: [...sales]
        }], true)
      }
    )
  }
  // For Order chart
  getOrderData() {
    this.shopify.getOrderData().subscribe(
      (res: number[]) => {
        const order = res;
        this.chart1.updateSeries([{
          name: 'orders',
          data: [...order]
        }])
      }
    )
  }
  naviation() {
    this.router.navigateByUrl('/facebook')
  }
}
