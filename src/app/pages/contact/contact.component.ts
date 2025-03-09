import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
  template: `
    <!-- Contact Banner -->
    <div class="relative h-[400px] overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=3270&auto=format&fit=crop')"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/80"></div>
      </div>
      <div class="absolute inset-0 flex items-center">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl" @fadeSlide>
            <h1 class="text-5xl font-bold text-white mb-6">Contact Us</h1>
            <p class="text-xl text-white/90">
              Get in touch with our team for any inquiries about our tracking services
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Form Section -->
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <!-- Contact Info Cards -->
          <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div class="text-blue-600 mb-4">
              <i class="fas fa-map-marker-alt text-2xl"></i>
            </div>
            <h3 class="text-lg font-semibold mb-2">Our Location</h3>
            <p class="text-gray-600">
              123 Testing lane
              <br />
              Test Address
            </p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div class="text-blue-600 mb-4">
              <i class="fas fa-phone text-2xl"></i>
            </div>
            <h3 class="text-lg font-semibold mb-2">Phone</h3>
            <p class="text-gray-600">
              123456780
              <br />
              Mon-Fri 9am-6pm
            </p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div class="text-blue-600 mb-4">
              <i class="fas fa-envelope text-2xl"></i>
            </div>
            <h3 class="text-lg font-semibold mb-2">Email</h3>
            <p class="text-gray-600">
              support&#64;trackcargo.com
              <br />
              sales&#64;trackcargo.com
            </p>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white rounded-xl shadow-xl p-8" @fadeSlide>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          <form (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  [(ngModel)]="formData.name"
                  name="name"
                  class="input-field"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  [(ngModel)]="formData.email"
                  name="email"
                  class="input-field"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                [(ngModel)]="formData.subject"
                name="subject"
                class="input-field"
                placeholder="How can we help you?"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                [(ngModel)]="formData.message"
                name="message"
                rows="6"
                class="input-field resize-none"
                placeholder="Your message here..."
                required
              ></textarea>
            </div>

            <button type="submit" [disabled]="isSubmitting" class="btn-primary group w-full">
              <span class="flex items-center justify-center">
                <i class="fas fa-paper-plane mr-2 group-hover:translate-x-1 transition-transform"></i>
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .input-field {
        @apply w-full px-4 py-3 border border-gray-300 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:border-transparent transition-all duration-200
             hover:border-blue-300;
      }

      .btn-primary {
        @apply px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg 
             hover:from-blue-700 hover:to-blue-800 transition-all duration-300 
             font-medium text-center relative overflow-hidden
             transform hover:-translate-y-0.5 active:translate-y-0
             shadow-lg hover:shadow-xl active:shadow-md
             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none;
      }
    `,
  ],
})
export class ContactComponent {
  isSubmitting = false;
  formData: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  onSubmit() {
    this.isSubmitting = true;
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', this.formData);
      this.isSubmitting = false;
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: '',
      };
      // You would typically show a success message here
    }, 2000);
  }
}
