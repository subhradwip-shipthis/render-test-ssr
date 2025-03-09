import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-gray-900 text-white py-8 mt-12">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">Track Cargo</h3>
            <p class="text-gray-400">Your trusted partner in global logistics tracking and management.</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Track Shipment</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Developer API</a></li>
              <li>
                <a href="https://www.shipthis.co/" target="_blank" class="hover:text-white transition-colors">
                  Partnered with Shipthis - ERP
                </a>
              </li>
              <!-- <li><a href="#" class="hover:text-white transition-colors">About Us</a></li> -->
            </ul>
          </div>
          <!-- <div>
            <h3 class="text-lg font-semibold mb-4">Contact</h3>
            <ul class="space-y-2 text-gray-400">
              <li>
                <i class="fas fa-envelope mr-2"></i>
                support&#64;trackcargo.com
              </li>
              <li>
                <i class="fas fa-phone mr-2"></i>
                123456791
              </li>
            </ul>
          </div> -->
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&#169; 2025 Track Cargo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
