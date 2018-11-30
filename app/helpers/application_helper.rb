module ApplicationHelper

	def auto_tts(words)
		render 'shared/auto_ttsTemplate',
			:words => words
	end
end
