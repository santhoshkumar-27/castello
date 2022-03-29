import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { 
  ApexAxisChartSeries,
  ApexChart, 
  ApexDataLabels, 
  ApexFill, 
  ApexGrid, 
  ApexLegend, 
  ApexMarkers, 
  ApexNoData, 
  ApexNonAxisChartSeries, 
  ApexPlotOptions, 
  ApexResponsive, 
  ApexStates, 
  ApexStroke, 
  ApexTheme, 
  ApexTitleSubtitle, 
  ApexTooltip, 
  ApexXAxis, 
  ApexYAxis, 
  ChartComponent } from 'ng-apexcharts';
import { FacebookService } from '../shared/facebook/facebook.service';

export interface ReachI {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  // markers: ApexMarkers;
  tooltip: ApexTooltip; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  // fill: ApexFill;
  colors: string[];
  noData: ApexNoData;
}

export type ImpressionsI = {
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
  colors: string[];
  noData: ApexNoData;
};

export type AgeRangeI = {
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
  colors: string[];
  noData: ApexNoData;
};

export type GenderI = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  colors: string[];
  noData: ApexNoData;
};

export type FollowerCountI = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: any;
  stroke: ApexStroke;
  states: ApexStates;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  colors: string[];
  noData: ApexNoData;
};


@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss']
})
export class FacebookComponent implements OnInit {
  @ViewChild('reachChart') reachChart!: ChartComponent;
  @ViewChild('impressionsChart') impressionsChart!: ChartComponent;
  @ViewChild('ageRangeChart') ageRangeChart!: ChartComponent;
  @ViewChild('genderChart') genderChart!: ChartComponent;
  @ViewChild('followerCountChart') followerCountChart!: ChartComponent;
  public reach!: ReachI;
  public impressions!: ImpressionsI;
  public ageRange!: AgeRangeI;
  public gender!: GenderI;
  public followerCount!: FollowerCountI;

  constructor(
    private router: Router,
    private fbs: FacebookService) {
    this.renderChart();
    this.getFacebookData()
  }

  ngOnInit(): void {
  }

  renderChart() {
    this.reach = {
      colors: ['#001fb4', '#d71ef9'],
      noData: {
        text: 'loading...'
      },
      series: [],
      chart: {
        height: 350,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "smooth",
        dashArray: [0, 0]
      },
      title: {
        text: "Reach",
        align: "left"
      },
      legend: {
        show: true,
      },
      // markers: {
      //   size: 0,
      //   hover: {
      //     sizeOffset: 6
      //   }
      // },
      xaxis: {
        min: 0,
        labels: {
          trim: false
        },
        categories: ["02/14", "02/15", "02/16", "02/17", "02/18", "02/19", "02/20", "02/20"],
      },
      yaxis: {
        tickAmount: 10,
        min: 0,
        max: 2500,
        axisBorder: {
          show: true,
          color: '#e4e4e4',
          offsetX: 0,
          offsetY: 0
        },
      },
      // fill: {
      // },
      tooltip: {
        enabled: true,
        followCursor: false,
        fillSeriesColor: false,
        onDatasetHover: {
          highlightDataSeries: true,
        },
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };

    this.impressions = {
      colors: ['#001fb4', '#d71ef9'],
      noData: {
        text: 'loading...'
      },
      series: [],
      chart: {
        type: "bar",
        height: 350
      },
      title: {
        text: "Impressions"
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "25%",
          colors: {
            ranges: [],
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
            return `impressions ${val}`;
          }
        }
      }
    }

    this.ageRange = {
      colors: ['#001fb4', '#0f32e1', '#6421f5', '#9720f8', '#c41df1', '#f11cf9'],
      noData: {
        text: 'loading...'
      },
      series: [],
      chart: {
        type: "bar",
        height: 350
      },
      title: {
        text: "Impressions"
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          colors: {
            ranges: [],
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
        max: 1800,
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
            return `age-range ${val}`;
          }
        }
      }
    }

    this.gender = {
      colors: ['#001fb4', '#d71ef9', '#707070'],
      noData: {
        text: 'loading...'
      },
      series: [],
      chart: {
        type: "donut",
        width: 500,
      },
      legend: {
        position: 'bottom',
      },
      labels: ["Male", "Female", "unknown"],
      responsive: [
        // {
        //   breakpoint: 480,
        //   options: {
        //     chart: {
        //       width: 20
        //     },
        //     legend: {
        //       position: "top"
        //     }
        //   }
        // }
      ]
    };

    this.followerCount = {
      noData: {
        text: 'loading...'
      },
      colors: ['#0e1fb8'],
      series: [],
      chart: {
        width: 380,
        type: "donut",
        dropShadow: {
          enabled: true,
          color: "#111",
          top: -1,
          left: 3,
          blur: 3,
          opacity: 0.2
        }
      },
      stroke: {
        width: 0
      },
      plotOptions: {
        // pie: {
        //   donut: {
        //     labels: {
        //       show: true,
        //       total: {
        //         showAlways: true,
        //         show: true
        //       }
        //     }
        //   }
        // }
        pie: {
          startAngle: 0,
          endAngle: 360,
          expandOnClick: true,
          offsetX: 0,
          offsetY: 0,
          customScale: 1,
          dataLabels: {
            offset: 0,
            minAngleToShowLabel: 10
          },
          donut: {
            size: '65%',
            background: 'transparent',
            labels: {
              show: true,
              // name: {
              //   show: true,
              //   fontSize: '22px',
              //   fontFamily: 'Helvetica, Arial, sans-serif',
              //   fontWeight: 600,
              //   color: undefined,
              //   offsetY: -10,
              //   formatter: function (val) {
              //     return val
              //   }
              // },
              // value: {
              //   show: true,
              //   fontSize: '16px',
              //   fontFamily: 'Helvetica, Arial, sans-serif',
              //   fontWeight: 400,
              //   color: undefined,
              //   offsetY: 16,
              //   formatter: function (val) {
              //     return val
              //   }
              // },
              total: {
                show: true,
                showAlways: true,
                label: 'Total',
                fontSize: '22px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                color: '#373d3f',
              }
            }
          },
        }
      },
      legend: {
        show: false,
        // position: "bottom",
      },
      labels: [""],
      dataLabels: {
        enabled: false,
        // dropShadow: {
        //   blur: 3,
        //   opacity: 0.8
        // }
      },
      fill: {
        // type: "pattern",
        // opacity: 1,
        // pattern: {
        //   enabled: true,
        //   style: [
        //     "verticalLines",
        //     "squares",
        //     "horizontalLines",
        //     "circles",
        //     "slantedLines"
        //   ]
        // }
      },
      states: {
        // hover: {
        //   filter: {
        //     type: "none"
        //   }
        // }
      },
      theme: {
        palette: "palette2"
      },
      title: {
        text: "Favourite Movie Type"
      },
      responsive: [
        // {
        //   breakpoint: 480,
        //   options: {
        //     chart: {
        //       width: 200
        //     },
        //     legend: {
        //       position: "bottom"
        //     }
        //   }
        // }
      ]
    };
  }

  getFacebookData() {
    setTimeout(() => {
      this.getReachData();
      this.getImpressionsData();
      this.getAgeRangeData();
      this.getGenderData();
      this.getFollowerCountData();
    }, 3000)
  }
  getReachData() {
    this.fbs.getReachData().subscribe(
      (res: any) => {
        this.reachChart.updateSeries([...res.data.reach], true)
      }
    )
  }
  getImpressionsData() {
    this.fbs.getReachData().subscribe(
      (res: any) => {
        this.impressionsChart.updateSeries([...res.data.impression], true)
      }
    )
  }
  getAgeRangeData() {
    this.fbs.getReachData().subscribe(
      (res: any) => {
        this.ageRangeChart.updateSeries([...res.data.ageRange], true)
      }
    )
  }
  getGenderData() {
    this.fbs.getReachData().subscribe(
      (res: any) => {
        this.genderChart.updateSeries([...res.data.gender], true)
      }
    )
  }
  getFollowerCountData() {
    this.fbs.getReachData().subscribe(
      (res: any) => {
        this.followerCountChart.updateSeries([...res.data.followercount], true)
      }
    )
  }
  navigation() {
    this.router.navigateByUrl('shopify')
  }
}
