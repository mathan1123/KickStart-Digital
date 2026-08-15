<?php /** Contact Section Part */ ?>
<section id="contact" class="section section-bg-alt">
  <div class="container">
    <div class="section-header reveal-fade">
      <div class="section-badge badge-green">GET IN TOUCH</div>
      <h2 class="section-title">Let's Talk About <span class="text-gradient">Your Growth</span></h2>
      <p class="section-description">Ready to transform your marketing into a high-ROI engine? Get in touch below.</p>
    </div>

    <div class="contact-grid">
      <!-- Left Contact Info -->
      <div class="contact-info-card reveal-left">
        <div>
          <h3 class="contact-info-title text-green">Build Your AI Growth Funnel</h3>
          <p class="contact-info-sub">Our AI strategists are ready to evaluate your current setup and craft a custom roadmap.</p>

          <div class="contact-details">
            <div class="contact-detail-item">
              <div class="contact-icon"><i class="fa-solid fa-envelope"></i></div>
              <div>
                <div class="contact-lbl">Email Us</div>
                <div class="contact-val text-blue">hello@kickstart.digital</div>
              </div>
            </div>

            <div class="contact-detail-item">
              <div class="contact-icon"><i class="fa-solid fa-phone"></i></div>
              <div>
                <div class="contact-lbl">Call Us</div>
                <div class="contact-val text-green">+1 (555) 234-5678</div>
              </div>
            </div>

            <div class="contact-detail-item">
              <div class="contact-icon"><i class="fa-solid fa-location-dot"></i></div>
              <div>
                <div class="contact-lbl">Global HQ</div>
                <div class="contact-val">100 Innovation Way, Suite 400<br>San Francisco, CA 94105</div>
              </div>
            </div>

            <div class="contact-detail-item">
              <div class="contact-icon"><i class="fa-solid fa-clock"></i></div>
              <div>
                <div class="contact-lbl">AI Support Hours</div>
                <div class="contact-val">24/7 Automated Monitoring & Strategy Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Contact Form -->
      <div class="contact-form-card reveal-right">
        <?php
        if (isset($_GET['contact_sent'])) {
            echo '<div class="form-success-banner" style="display: flex;"><i class="fa-solid fa-circle-check text-green text-xl"></i><span>Thank you! Your message has been sent successfully. An AI specialist will contact you within 24 hours.</span></div>';
        }
        ?>
        <div id="form-success-banner" class="form-success-banner">
          <i class="fa-solid fa-circle-check text-green text-xl"></i>
          <span>Thank you! Your message has been sent successfully. An AI specialist will contact you within 24 hours.</span>
        </div>

        <form id="contact-form" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" method="POST" novalidate>
          <input type="hidden" name="action" value="kickstart_send_contact">

          <div class="form-group">
            <label for="contact-name" class="form-label">Full Name *</label>
            <input type="text" id="contact-name" name="name" class="form-input" placeholder="e.g. John Doe">
            <span class="form-error">Please enter your name</span>
          </div>

          <div class="form-group">
            <label for="contact-email" class="form-label">Email Address *</label>
            <input type="email" id="contact-email" name="email" class="form-input" placeholder="e.g. john@company.com">
            <span class="form-error">Please enter a valid email</span>
          </div>

          <div class="form-group">
            <label for="contact-company" class="form-label">Company Name</label>
            <input type="text" id="contact-company" name="company" class="form-input" placeholder="e.g. Acme Corp">
          </div>

          <div class="form-group">
            <label for="contact-phone" class="form-label">Phone Number</label>
            <input type="tel" id="contact-phone" name="phone" class="form-input" placeholder="e.g. +1 (555) 000-0000">
          </div>

          <div class="form-group">
            <label for="contact-message" class="form-label">Message *</label>
            <textarea id="contact-message" name="message" class="form-textarea" placeholder="Tell us about your business goals or AI requirements..."></textarea>
            <span class="form-error">Please enter your message</span>
          </div>

          <button type="submit" class="btn btn-primary btn-full btn-lg">
            Launch Inquiry <i class="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
