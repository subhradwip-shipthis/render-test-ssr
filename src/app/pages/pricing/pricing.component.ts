import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
  templateUrl: './pricing.component.html',
  styles: [
    `
      .animated-button {
        background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
      }
    `,
  ],
})
export class PricingComponent {
  ALL_PRICING_DETAILS: any[] = [
    {
      title: 'VIP',
      benefits: [
        'It is a long established fact that a reader will be distracted by the readable content',
        'It is a long established fact that a reader will be distracted by the readable content',
        'It is a long established fact that a reader will be distracted by the readable content',
        'It is a long established fact that a reader will be distracted by the readable content',
      ],
      premium: true,
      price: '$10/month',
      description:
        'It is a long established fact that a reader will be distracted by the readable content.It is a long established fact that a reader will be distracted by the readable content',
    },
    {
      title: 'ENTERPRISE',
      recommended: true,
      premium: true,
      benefits: [
        'It is a long established fact that a reader will be distracted by the readable content',
        'It is a long established fact that a reader will be distracted by the readable content',
        'It is a long established fact that a reader will be distracted by the readable content',
        'It is a long established fact that a reader will be distracted by the readable content',
      ],
      price: '$10/month',
      description:
        'It is a long established fact that a reader will be distracted by the readable content.It is a long established fact that a reader will be distracted by the readable content',
    },
    {
      title: 'FREE',
      benefits: [
        'It is a long established fact that a reader will be distracted by the readable content',
        'It is a long established fact that a reader will be distracted by the readable content',
        'It is a long established fact that a reader will be distracted by the readable content',
        'It is a long established fact that a reader will be distracted by the readable content',
      ],
      price: '$10/month',
      description:
        'It is a long established fact that a reader will be distracted by the readable content.It is a long established fact that a reader will be distracted by the readable content',
    },
  ];
}
